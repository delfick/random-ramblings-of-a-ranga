package main

import (
	"log"
	"net/http"
)

func main() {
	log.Fatal(http.ListenAndServe(":4213", http.FileServer(http.Dir("dist"))))
}
