package common

import (
	log "github.com/Sirupsen/logrus"
	_ "github.com/lib/pq"

	"database/sql"
	"fmt"
	"strings"
)

type PostgresClient struct {
	db *sql.DB
}

// Postgres tables
const (
	TableAccounts              = "account"
	tableAccountsColumnName    = "name"
	tableAccountsColumnBalance = "balance"
)

func NewPostgresClient() PostgresClient {

	return PostgresClient{db: openDBConnection()}
}

func (pc PostgresClient) Initialize() {

	pc.createAccountsTable()
}

func (pc PostgresClient) Close() {

	pc.db.Close()
}

func (pc PostgresClient) InsertAccount(account Account) {

	stmt, err := pc.db.Prepare(fmt.Sprintf("INSERT INTO %s (%s, %s) VALUES($1, $2)", TableAccounts, tableAccountsColumnName, tableAccountsColumnBalance))
	if err != nil {
		log.Error(fmt.Sprintf("Failed to prepare insert statment into %s table. ", TableAccounts), err)
		return
	}
	res, err := stmt.Exec(account.Id, account.Balance)
	if err != nil {
		log.Error(fmt.Sprintf("Failed to insert into %s table. ", TableAccounts), err)
		return
	}
	_, err = res.RowsAffected()
	if err != nil {
		log.Errorf("No row affected while tried to insert new account (%v). %v", account, err)
		return
	}
	log.Infof("Account added %v", account)
}

func openDBConnection() *sql.DB {

	const dbName = "postgres"
	log.Infof("Opening connection to Postgres DB '%s'...", dbName)
	db, err := sql.Open("postgres", fmt.Sprintf("host=localhost port=5432 user=admin password=123 dbname=%s sslmode=disable", dbName))
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Infof("Successfully connected to Postgres DB '%s'", dbName)

	return db
}

func (pc PostgresClient) createAccountsTable() {

	pc.createTable(fmt.Sprintf("CREATE TABLE %s (%s text, %s integer)", TableAccounts, tableAccountsColumnName, tableAccountsColumnBalance), TableAccounts)
}

func (pc PostgresClient) createTable(createQuery, table string) {

	if err := pc.doCreateTable(createQuery, table); err != nil {
		if strings.Contains(err.Error(), " already exists") {
			log.Error(err)
			pc.dropTable(table)
			if err := pc.doCreateTable(createQuery, table); err != nil {
				log.Fatal(err)
			}
		} else {
			log.Fatal(err)
		}
	}
}

func (pc PostgresClient) dropTable(table string) {

	log.Infof("Dropping table '%s'...", table)
	sqlDrop := fmt.Sprintf("DROP TABLE %s", table)
	if _, err := pc.db.Exec(sqlDrop); err != nil {
		log.Fatal(err)
	}
}

func (pc PostgresClient) doCreateTable(query, table string) error {

	log.Infof("Creating table %s...", table)
	_, err := pc.db.Exec(query)

	return err
}
