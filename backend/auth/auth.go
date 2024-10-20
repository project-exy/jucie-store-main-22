package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/pecet3/my-api/data"
	"github.com/pecet3/my-api/utils"
)

type auth struct {
	ss   *SessionStore
	data data.Data
}

type authLoginDto struct {
	Password string `json:"password"`
}
type adminLoginDto struct {
	Name     string `json:"username"`
	Password string `json:"password"`
}

func Run(srv *http.ServeMux, ss *SessionStore, data data.Data) {
	a := &auth{
		ss:   ss,
		data: data,
	}

	srv.HandleFunc("/auth/login-admin", a.handleAdminLogin)
	srv.HandleFunc("/auth/login", a.handleLogin)

	go changePasswordLoop(ss)
	go cleanUpExpiredSessionsLoop(ss)
}
func (a auth) handleLogin(w http.ResponseWriter, r *http.Request) {
	var dto authLoginDto
	err := json.NewDecoder(r.Body).Decode(&dto)
	if err != nil {
		log.Println("<Auth>", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
	currentPswd := a.ss.GetCurrentPassword()
	log.Printf("<Auth> User with IP:%s tries to login, currentPswd: %s, dto: %s",
		utils.GetIP(r), currentPswd, dto.Password)

	if currentPswd == dto.Password {
		us, token := a.ss.NewAuthSession()
		a.ss.AddAuthSession(token, us)
		http.SetCookie(w, &http.Cookie{
			Name:     "session_token",
			Value:    token,
			Expires:  us.Expiry,
			SameSite: http.SameSiteStrictMode,
			Path:     "/",
			Secure:   true,
			HttpOnly: true,
		})
		w.WriteHeader(http.StatusOK)
		return
	}
	w.WriteHeader(http.StatusBadRequest)
}

func (a auth) handleAdminLogin(w http.ResponseWriter, r *http.Request) {
	name := os.Getenv("USER_NAME")
	password := os.Getenv("USER_PASSWORD")
	var dto adminLoginDto
	err := json.NewDecoder(r.Body).Decode(&dto)
	if err != nil {
		log.Println("<Auth>", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	if name == dto.Name && password == dto.Password {
		us, token := a.ss.NewAdminSession(r)
		a.ss.AddAdminSession(token, us)
		http.SetCookie(w, &http.Cookie{
			Name:     "admin_token",
			Value:    token,
			Expires:  us.Expiry,
			SameSite: http.SameSiteStrictMode,
			Path:     "/",
		})
		w.WriteHeader(http.StatusOK)
		return
	}
	http.Error(w, "wrong credentials", http.StatusUnauthorized)
}
