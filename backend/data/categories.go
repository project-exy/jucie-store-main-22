package data

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
)

const CategoriesTable = `
create table if not exists categories(
	id integer primary key autoincrement,
	name text
)`

type Category struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func (c *Category) GetById(db *sql.DB, id int) (*Category, error) {
	query := "SELECT name, id FROM categories WHERE id = ?"
	row := db.QueryRow(query, id)

	var name string
	var idDb int
	if err := row.Scan(&name, &idDb); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("category not found")
		}
		return nil, err
	}

	return c, nil
}

func (c Category) Add(db *sql.DB, name string) error {
	query := "insert into categories (name) values (?)"
	_, err := db.Exec(query, name)
	if err != nil {
		return err
	}
	return nil
}

func (c Category) GetAll(db *sql.DB) ([]*Category, error) {
	query := "select name, id from categories"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	var categories []*Category
	for rows.Next() {
		var category Category
		err := rows.Scan(
			&category.Name,
			&category.Id,
		)
		if err != nil {
			return nil, err
		}
		categories = append(categories, &category)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return categories, nil
}

func (c Category) Delete(db *sql.DB, id int) error {
	query := "delete from categories where id = ?"
	_, err := db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

func insertCategories(db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM categories")
	if err != nil {
		return nil
	}
	defer rows.Close()

	var categories []Category
	for rows.Next() {
		var p Category
		err := rows.Scan(&p.Id, &p.Name)
		if err != nil {
			return nil
		}
		categories = append(categories, p)
	}

	if err = rows.Err(); err != nil {
		return nil
	}
	if len(categories) > 0 {
		return nil
	}
	log.Println("<DB> Inserting categories")
	pricesSQL := `
    INSERT INTO categories (name) VALUES
    ('ultimate'),
    ('less creations'),
    ('hidden potion'),
	('others')
    `

	_, err = db.Exec(pricesSQL)
	if err != nil {
		log.Println(err)
		return fmt.Errorf("failed to insert: %v", err)
	}

	return nil
}
