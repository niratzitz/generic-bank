package common

type Account struct {
	Id      string `json:"id"`
	Balance int    `json:"balance"`
}

func NewAccount(id string) Account {

	return Account{Id: id, Balance: 0}
}
