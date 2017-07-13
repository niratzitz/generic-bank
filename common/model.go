package common

type Account struct {
	Name    string `json:"id"`
	Balance int    `json:"balance"`
}

func NewAccount(name string) Account {

	return Account{Name: name, Balance: 0}
}
