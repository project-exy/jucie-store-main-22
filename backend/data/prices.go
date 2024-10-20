package data

import (
	"database/sql"
	"fmt"
	"log"
)

const PricesTable = `
create table if not exists prices (
    id integer primary key autoincrement,
    capacity integer,
    price real
)`

type Price struct {
	Id       int     `json:"id"`
	Capacity int     `json:"capacity"`
	Price    float64 `json:"price"`
}

func (pr Price) Add(db *sql.DB, p Price) (int64, error) {
	stmt, err := db.Prepare("INSERT INTO prices(capacity, price) VALUES(?, ?)")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(p.Capacity, p.Price)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func (pr Price) Delete(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM prices WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	return err
}

func (pr Price) Update(db *sql.DB, p *Price) error {
	query := "UPDATE prices SET price = ? WHERE capacity = ?"
	_, err := db.Exec(query, p.Price, p.Capacity)
	if err != nil {
		return err
	}
	return nil
}

func (pr Price) GetById(db *sql.DB, pId int) (*Price, error) {
	query := "SELECT id, capacity, price FROM prices where id = ?"

	row := db.QueryRow(query, pId)

	var p Price
	err := row.Scan(&p.Id, &p.Capacity, &p.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("price with id: %d not found", pId)
		}
		log.Println(err)
		return nil, err
	}
	return &p, nil
}

func (pr Price) GetAll(db *sql.DB) ([]Price, error) {
	rows, err := db.Query("SELECT id, capacity, price FROM prices")
	if err != nil {
		return nil, fmt.Errorf("failed to query prices: %v", err)
	}
	defer rows.Close()

	var prices []Price
	for rows.Next() {
		var p Price
		err := rows.Scan(&p.Id, &p.Capacity, &p.Price)
		if err != nil {
			return nil, fmt.Errorf("failed to scan price row: %v", err)
		}
		prices = append(prices, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error during row iteration: %v", err)
	}

	return prices, nil
}

func insertPrices(db *sql.DB) error {

	rows, err := db.Query("SELECT id, capacity, price FROM prices")
	if err != nil {
		return nil
	}
	defer rows.Close()

	var prices []Price
	for rows.Next() {
		var p Price
		err := rows.Scan(&p.Id, &p.Capacity, &p.Price)
		if err != nil {
			return nil
		}
		prices = append(prices, p)
	}

	if err = rows.Err(); err != nil {
		return nil
	}
	if len(prices) > 0 {
		return nil
	}
	pricesSQL := `
    INSERT INTO prices (capacity, price) VALUES
    (30,  29.99),
    (60,  49.99),
    (100, 69.99)
    `

	_, err = db.Exec(pricesSQL)
	if err != nil {
		return fmt.Errorf("failed to insert prices: %v", err)
	}
	log.Println("<DB> Prices have been inserted successfully")

	return nil
}
