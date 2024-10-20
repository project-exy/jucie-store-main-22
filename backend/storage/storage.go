package storage

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/pecet3/my-api/auth"
)

type storage struct {
	db      *sql.DB
	methods StorageServices
}

func Run(srv *http.ServeMux, db *sql.DB, as *auth.SessionStore) {
	s := &storage{
		db:      db,
		methods: &Services{},
	}
	srv.Handle("POST /upload-image", as.AuthorizeAdmin(s.handleUpload))
	srv.HandleFunc("/uploads/{file}", s.serveFileHandler)
}

func (s storage) handleUpload(w http.ResponseWriter, r *http.Request) {
	log.Println("User is uploading a image")
	file, header, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error retrieving file", http.StatusBadRequest)
		return
	}

	path, err := s.methods.AddImage(file, header)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error Saving or compressing a file", http.StatusInternalServerError)
		return
	}

	w.Write([]byte(path))
}

func (s storage) serveFileHandler(w http.ResponseWriter, r *http.Request) {
	fileName := r.PathValue("file")

	if fileName == "" {
		http.Error(w, "Invalid image type", http.StatusBadRequest)
		return
	}
	log.Println("Accessing to the resources:", fileName)

	if _, err := os.Stat("./static/uploads/" + fileName); os.IsNotExist(err) {
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}
	ext := filepath.Ext(fileName)
	mimeTypes := map[string]string{
		".jpg":  "image/jpeg",
		".jpeg": "image/jpeg",
		".png":  "image/png",
	}

	mime, exists := mimeTypes[ext]
	if !exists {
		http.Error(w, "Invalid image type", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", mime)

	http.ServeFile(w, r, "./static/uploads/"+fileName)
}
