package data

import (
	"database/sql"
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

func (c Category) Add(db *sql.DB, name string) error {
	query := "insert into categories (name) values (?)"
	_, err := db.Exec(query, name)
	if err != nil {
		return err
	}
	return nil
}

func (c Category) GetAll(db *sql.DB) ([]Category, error) {
	query := "select name from categories"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	var categories []Category
	for rows.Next() {
		var category Category
		err := rows.Scan(
			&category.Name,
		)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
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
