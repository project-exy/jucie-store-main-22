package auth

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/pecet3/my-api/utils"
)

type AdminSessions = map[string]*Session

func (as *SessionStore) NewAdminSession(r *http.Request) (*Session, string) {
	newToken := uuid.NewString()
	expiresAt := time.Now().Add(72 * time.Hour)

	us := &Session{
		Expiry: expiresAt,
		Token:  newToken,
		UserIp: utils.GetIP(r),
		Type:   typeAdmin,
	}
	return us, newToken
}

func (as *SessionStore) GetAdminSession(token string) (*Session, bool) {
	as.sMu.RLock()
	defer as.sMu.RUnlock()
	session, exists := as.AdminSessions[token]
	if !exists {
		return nil, false
	}
	return session, true
}

func (as *SessionStore) AddAdminSession(token string, session *Session) {
	as.eMu.Lock()
	defer as.eMu.Unlock()
	as.AdminSessions[token] = session
}
func (as *SessionStore) RemoveAdminSession(token string) {
	as.eMu.Lock()
	defer as.eMu.Unlock()
	delete(as.AdminSessions, token)
}

func (as *SessionStore) AuthorizeAdmin(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("admin_token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Redirect(w, r, "/login-admin", http.StatusPermanentRedirect)
				return
			}
			http.Error(w, "Bad request", http.StatusBadRequest)
			return
		}
		sessionToken := cookie.Value
		var s *Session
		s, exists := as.GetAdminSession(sessionToken)
		if !exists {
			http.Redirect(w, r, "/login-admin", http.StatusPermanentRedirect)
			return
		}
		if s.Type != typeAdmin {
			log.Println("<Auth> Trying to log in AuthSession as AdminSession")
			http.Error(w, "", http.StatusUnauthorized)
			return
		}
		userIp := utils.GetIP(r)
		if s.UserIp != userIp {
			log.Printf("[!!!] Unauthorized ip: %s ", userIp)
			http.Error(w, "", http.StatusUnauthorized)
			return
		}

		if s.Expiry.Before(time.Now()) {
			delete(as.AdminSessions, sessionToken)
			http.Error(w, "", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), &Session{}, s)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
