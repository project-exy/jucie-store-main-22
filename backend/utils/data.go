package utils

import (
	"net"
	"net/http"
)

func GetIP(r *http.Request) string {
	xff := r.Header.Get("X-Forwarded-For")
	if xff != "" {
		// X-Forwarded-For can contain a list of IPs, so take the first one
		ip := xff
		if idx := net.ParseIP(ip); idx != nil {
			return ip
		}
	}

	xri := r.Header.Get("X-Real-Ip")
	if xri != "" {
		ip := xri
		if idx := net.ParseIP(ip); idx != nil {
			return ip
		}
	}

	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return ""
	}
	userIP := net.ParseIP(ip)
	if userIP == nil {
		return ""
	}
	return userIP.String()
}
