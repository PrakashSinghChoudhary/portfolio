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
	{ link: "/blog/golang", text: "Golang" },
	{ link: "", text: "Introduction to Golang" },
];

export const helloWorldCode = `package main

import "fmt"

func main() {
	message := "Hello, Gophers!"
	fmt.Println(message)
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

	updatePortByPointer(&config, 9000)
	fmt.Println(config.Port)
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
	DispatchAlert(webhook, "pager-duty", "Database latency spike")
}`;

export const errorHandlingCode = `package main

import (
	"errors"
	"fmt"
)

var (
	ErrNotFound     = errors.New("record not found")
	ErrUnauthorized = errors.New("insufficient privileges")
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
			return
		}
		fmt.Printf("Unexpected failure: %v\\n", err)
		return
	}

	fmt.Println("Found email:", email)
}`;

export const concurrencyCode = `package main

import (
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID   int
	Data string
}

type Result struct {
	JobID  int
	Output string
}

func worker(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range jobs {
		time.Sleep(10 * time.Millisecond)
		results <- Result{
			JobID:  job.ID,
			Output: fmt.Sprintf("worker-%d processed job-%d", id, job.ID),
		}
	}
}

func main() {
	const numJobs = 6
	const numWorkers = 3

	jobs := make(chan Job, numJobs)
	results := make(chan Result, numJobs)

	var wg sync.WaitGroup

	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	for j := 1; j <= numJobs; j++ {
		jobs <- Job{ID: j, Data: "payload"}
	}
	close(jobs)

	wg.Wait()
	close(results)

	for res := range results {
		fmt.Println(res.Output)
	}
}`;

export const slicesMemoryCode = `package main

import "fmt"

func inspectSlice(name string, s []int) {
	fmt.Printf("%s: len=%d cap=%d ptr=%p data=%v\\n", name, len(s), cap(s), s, s)
}

func main() {
	base := make([]int, 0, 4)
	inspectSlice("initial", base)

	base = append(base, 10, 20, 30)
	inspectSlice("appended", base)

	child := base[1:3]
	inspectSlice("sub-slice", child)

	child[0] = 999
	inspectSlice("base-after-mutation", base)

	base = append(base, 40, 50)
	inspectSlice("grown-capacity", base)
}`;
