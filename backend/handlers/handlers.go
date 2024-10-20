package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/pecet3/my-api/auth"
	"github.com/pecet3/my-api/data"
)

type handlers struct {
	data data.Data
	ss   *auth.SessionStore
	v    *validator.Validate
}

func Run(mux *http.ServeMux, v *validator.Validate, d data.Data, ss *auth.SessionStore) {
	h := handlers{
		data: d,
		ss:   ss,
		v:    v,
	}

	mux.HandleFunc("GET /api/products", h.handleProducts)
	mux.HandleFunc("GET /api/prices", h.handlePrices)
	mux.HandleFunc("POST /api/orders", h.handleOrders)
}
func (h handlers) handleProducts(w http.ResponseWriter, r *http.Request) {
	products, err := h.data.Product.GetAll(h.data.Db)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application-json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(products)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}

func (h handlers) handlePrices(w http.ResponseWriter, r *http.Request) {
	prices, err := h.data.Price.GetAll(h.data.Db)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application-json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(prices)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}

func (h handlers) handleOrders(w http.ResponseWriter, r *http.Request) {
	var order data.Order
	err := json.NewDecoder(r.Body).Decode(&order)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusBadRequest)
		return
	}
	err = h.v.Struct(order)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusBadRequest)
		return
	}
	log.Println(order)
	id, err := h.data.Order.Add(h.data.Db, &order)
	if err != nil {
		log.Println(err)
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	log.Println(id)
	w.WriteHeader(http.StatusOK)
}
