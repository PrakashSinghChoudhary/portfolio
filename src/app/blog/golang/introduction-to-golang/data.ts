export const date = "17 Nov 2026";

export const tableOfContent = [
	{
		num: "01",
		id: "why-go-exists",
		label: "Why Go Exists",
	},
	{
		num: "02",
		id: "packages-and-toolchain",
		label: "Packages & Toolchain",
	},
	{
		num: "03",
		id: "type-system-and-pointers",
		label: "Type System & Pointers",
	},
	{
		num: "04",
		id: "structs-and-composition",
		label: "Structs & Composition",
	},
	{
		num: "05",
		id: "implicit-interfaces",
		label: "Implicit Interfaces",
	},
	{
		num: "06",
		id: "explicit-error-handling",
		label: "Explicit Error Handling",
	},
	{
		num: "07",
		id: "concurrency-goroutines-channels",
		label: "Goroutines & Channels",
	},
	{
		num: "08",
		id: "slices-and-memory-model",
		label: "Slices & Memory Model",
	},
	{
		num: "09",
		id: "when-to-choose-go",
		label: "When to Choose Go",
	},
];

export const calloutPhilosophy = [
	{
		k: "SIMPLICITY AS A CORE FEATURE",
		d: "Go was deliberately designed with only 25 keywords. By rejecting complex language features like inheritance, pointer arithmetic, and implicit conversions, Go ensures that code written by any engineer is instantly readable by any other engineer.",
		bad: false,
		title: "PHILOSOPHY",
	},
];

export const calloutConcurrency = [
	{
		k: "THE GO CONCURRENCY MAXIM",
		d: "Do not communicate by sharing memory; instead, share memory by communicating. Goroutines and typed channels allow independent processes to synchronize safely without lock contention and deadlocks.",
		bad: false,
		title: "CONCURRENCY",
	},
];

export const calloutComposition = [
	{
		k: "COMPOSITION OVER INHERITANCE",
		d: "Go contains no class keyword and no extends keyword. Type relationships are built exclusively through struct embedding and implicit interface satisfaction, eliminating brittle class hierarchies entirely.",
		bad: false,
		title: "ARCHITECTURE",
	},
];

export const breadcrumbs = [
	{ link: "/blog", text: "Blog" },
	{ link: "/blog/golang/introduction-to-golang", text: "Golang" },
	{ link: "", text: "Introduction to Golang" },
];

export const helloWorldCode = `package main

import "fmt"

func main() {
	message := "Hello, Gophers!"
	fmt.Println(message)
	// Output: Hello, Gophers!
}`;

export const pointersCode = `package main

import "fmt"

type ServerConfig struct {
	Port    int
	MaxConn int
}

func updatePortByValue(cfg ServerConfig, newPort int) {
	cfg.Port = newPort
}

func updatePortByPointer(cfg *ServerConfig, newPort int) {
	cfg.Port = newPort
}

func main() {
	config := ServerConfig{Port: 8080, MaxConn: 1000}

	updatePortByValue(config, 9000)
	fmt.Println(config.Port)
	// Output: 8080

	updatePortByPointer(&config, 9000)
	fmt.Println(config.Port)
	// Output: 9000
}`;

export const structsAndMethodsCode = `package main

import "fmt"

type RateLimiter struct {
	Tokens    int
	Capacity  int
	RefillRate int
}

func NewRateLimiter(capacity, refillRate int) *RateLimiter {
	return &RateLimiter{
		Tokens:    capacity,
		Capacity:  capacity,
		RefillRate: refillRate,
	}
}

func (rl *RateLimiter) Allow() bool {
	if rl.Tokens > 0 {
		rl.Tokens--
		return true
	}
	return false
}

type APIGateway struct {
	RateLimiter
	Name string
}

func main() {
	gw := APIGateway{
		RateLimiter: *NewRateLimiter(5, 1),
		Name:        "Edge-Gateway-01",
	}

	fmt.Println(gw.Name, gw.Allow())
	// Output: Edge-Gateway-01 true
}`;

export const interfacesCode = `package main

import "fmt"

type Notifier interface {
	Send(recipient string, message string) error
}

type EmailNotifier struct {
	SMTPServer string
}

func (e EmailNotifier) Send(recipient string, message string) error {
	fmt.Printf("Email to %s: %s\\n", recipient, message)
	return nil
}

type WebhookNotifier struct {
	EndpointURL string
}

func (w WebhookNotifier) Send(recipient string, message string) error {
	fmt.Printf("Webhook to %s: %s\\n", recipient, message)
	return nil
}

func DispatchAlert(n Notifier, target string, body string) {
	n.Send(target, body)
}

func main() {
	email := EmailNotifier{SMTPServer: "smtp.internal.net"}
	webhook := WebhookNotifier{EndpointURL: "https://api.internal/hook"}

	DispatchAlert(email, "admin@infra.dev", "High CPU Load")
	// Output: Email to admin@infra.dev: High CPU Load

	DispatchAlert(webhook, "pager-duty", "Database latency spike")
	// Output: Webhook to pager-duty: Database latency spike
}`;

export const errorHandlingCode = `package main

import (
	"errors"
	"fmt"
)

var (
	ErrNotFound = errors.New("record not found")
)

type UserStore struct {
	users map[string]string
}

func (s *UserStore) GetEmail(username string) (string, error) {
	email, exists := s.users[username]
	if !exists {
		return "", ErrNotFound
	}
	return email, nil
}

func main() {
	store := UserStore{
		users: map[string]string{
			"prakash": "singhprakashchoudhary@gmail.com",
		},
	}

	email, err := store.GetEmail("alex")
	if err != nil {
		if errors.Is(err, ErrNotFound) {
			fmt.Println("User missing from cache")
			// Output: User missing from cache
			return
		}
		fmt.Printf("Unexpected failure: %v\\n", err)
		return
	}

	fmt.Println("Found email:", email)
}`;

export const concurrencyCode = `package main

import "fmt"

func fetchStatus(service string, ch chan<- string) {
	ch <- fmt.Sprintf("%s is healthy", service)
}

func main() {
	ch := make(chan string, 3)

	go fetchStatus("Auth-Service", ch)
	go fetchStatus("Billing-API", ch)
	go fetchStatus("Payment-Gateway", ch)

	for i := 0; i < 3; i++ {
		msg := <-ch
		fmt.Println(msg)
	}
	// Output:
	// Auth-Service is healthy
	// Billing-API is healthy
	// Payment-Gateway is healthy
}`;

export const slicesMemoryCode = `package main

import "fmt"

func inspectSlice(name string, s []int) {
	fmt.Printf("%-18s len=%d cap=%d data=%v\\n", name, len(s), cap(s), s)
}

func main() {
	base := make([]int, 0, 4)
	inspectSlice("initial", base)
	// Output: initial            len=0 cap=4 data=[]

	base = append(base, 10, 20, 30)
	inspectSlice("appended", base)
	// Output: appended           len=3 cap=4 data=[10 20 30]

	child := base[1:3]
	inspectSlice("sub-slice", child)
	// Output: sub-slice          len=2 cap=3 data=[20 30]

	child[0] = 999
	inspectSlice("base-after-mutation", base)
	// Output: base-after-mutation len=3 cap=4 data=[10 999 30]

	base = append(base, 40, 50)
	inspectSlice("grown-capacity", base)
	// Output: grown-capacity     len=5 cap=8 data=[10 999 30 40 50]
}`;
