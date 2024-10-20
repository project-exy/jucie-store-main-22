package data

import (
	"database/sql"
	"fmt"
	"log"
)

const ProductsTable = `
create table if not exists products (
	id integer primary key autoincrement,
	name text not null,
	description text not null,
	image_url text default ''
);
`

type Product struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
}

func (p Product) GetAll(db *sql.DB) ([]Product, error) {
	query := `
        SELECT id, name, description, image_url
        FROM products
    `
	rows, err := db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying products: %v", err)
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var product Product
		err := rows.Scan(
			&product.Id,
			&product.Name,
			&product.Description,
			&product.ImageURL,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning product row: %v", err)
		}
		products = append(products, product)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating product rows: %v", err)
	}

	return products, nil
}

func (p Product) GetById(db *sql.DB, id int) (*Product, error) {
	query := "SELECT id, name, description, image_url FROM products WHERE id = ?"
	row := db.QueryRow(query, id)
	var product Product
	err := row.Scan(&product.Id, &product.Name, &product.Description, &product.ImageURL)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("product with id %d not found", id)
		}
		log.Println(err)
		return nil, err
	}
	return &product, nil
}

func (p Product) Add(db *sql.DB, name, description, imageURL string) (int, error) {
	query := "INSERT INTO products (name, description, image_url) VALUES (?, ?, ?)"
	result, err := db.Exec(query, name, description, imageURL)
	if err != nil {
		log.Println(err)
		return -1, err
	}
	productId, err := result.LastInsertId()
	if err != nil {
		log.Println(err)
		return -1, err
	}
	return int(productId), nil
}

func (p Product) RemoveById(db *sql.DB, id int) error {
	query := "DELETE FROM products WHERE id = ?"
	_, err := db.Exec(query, id)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}

func (p Product) Update(db *sql.DB, pr *Product) error {
	query := "UPDATE products SET name = ?, description = ?, image_url = ? WHERE id = ?"
	_, err := db.Exec(query, pr.Name, pr.Description, pr.ImageURL, pr.Id)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}
