package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/pecet3/my-api/utils"
	"github.com/pecet3/my-api/views"
)

func (c controllers) userLoginController(w http.ResponseWriter, r *http.Request) {
	views.UserLoginPage().Render(r.Context(), w)
}

func (c controllers) serveReact(w http.ResponseWriter, r *http.Request) {
	// FileServer serves static files from the "static/dist" directory
	fs := http.FileServer(http.Dir("./static/dist"))

	// Get the requested path
	path := r.URL.Path

	// Check if the file exists
	_, err := os.Stat("./static/dist" + path)

	// If the file doesn't exist (i.e., 404), serve the index.html for client-side routing
	if os.IsNotExist(err) {
		http.ServeFile(w, r, "./static/dist/index.html")
		return
	} else if err != nil {
		// Handle other possible errors (e.g., permission issues, etc.)
		http.Error(w, "Error accessing the requested file", http.StatusInternalServerError)
		return
	}

	// Log the user IP and requested path
	log.Printf("<Controllers> User with IP:%s requested: %s", utils.GetIP(r), path)

	// Serve the requested file if it exists
	fs.ServeHTTP(w, r)
}
