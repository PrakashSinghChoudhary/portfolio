export const date = "17 Nov 2026";

export const tableOfContent = [
	{
		num: "01",
		id: "philosophy-of-go-types",
		label: "Philosophy of Go Types",
	},
	{
		num: "02",
		id: "primitive-types-and-zero-values",
		label: "Primitives & Zero Values",
	},
	{
		num: "03",
		id: "strings-bytes-and-runes",
		label: "Strings, Bytes & Runes",
	},
	{
		num: "04",
		id: "arrays-and-slices",
		label: "Arrays vs. Slices",
	},
	{
		num: "05",
		id: "maps-and-the-comma-ok-idiom",
		label: "Maps & Comma-Ok Idiom",
	},
	{
		num: "06",
		id: "structs-and-custom-types",
		label: "Structs & Memory Alignment",
	},
	{
		num: "07",
		id: "pointers-and-escape-analysis",
		label: "Pointers & Escape Analysis",
	},
	{
		num: "08",
		id: "interfaces-and-the-any-type",
		label: "Interfaces & The any Type",
	},
	{
		num: "09",
		id: "best-practices-and-summary",
		label: "Type Best Practices",
	},
];

export const calloutZeroValues = [
	{
		k: "DETERMINISTIC ZERO VALUES",
		d: "Go never leaves memory uninitialized. Declaring a variable without an explicit value automatically initializes it to its type-safe zero value: 0 for numbers, false for booleans, \"\" for strings, and nil for pointers, slices, maps, channels, and interfaces.",
		bad: false,
		title: "MEMORY SAFETY",
	},
];

export const calloutNoImplicitCasting = [
	{
		k: "ZERO IMPLICIT COERCION",
		d: "Go strictly prohibits implicit type conversions. Even between identical underlying sizes like int and int64, you must explicitly cast. This eliminates entire classes of silent integer truncation and sign-extension bugs.",
		bad: false,
		title: "TYPE DISCIPLINE",
	},
];

export const calloutInterfaceNilGotcha = [
	{
		k: "THE INTERFACE NIL GOTCHA",
		d: "An interface value is only nil if both its dynamic type descriptor and its value pointer are nil. An interface holding a concrete pointer whose value is nil is NOT equal to nil.",
		bad: true,
		title: "SUBTLE TRAP",
	},
];

export const breadcrumbs = [
	{ link: "/blog", text: "Blog" },
	{ link: "/blog/golang", text: "Golang" },
	{ link: "", text: "Data Types in Golang" },
];

export const primitivesCode = `package main

import "fmt"

func main() {
	var count int = 42
	var threshold float64 = 98.6
	var isActive bool = true
	var char rune = '⌘'
	var rawByte byte = 0xFF

	fmt.Printf("count: %d (type: %T)\\n", count, count)
	fmt.Printf("threshold: %.1f (type: %T)\\n", threshold, threshold)
	fmt.Printf("isActive: %t (type: %T)\\n", isActive, isActive)
	fmt.Printf("char: %c (code point: %U)\\n", char, char)
	fmt.Printf("rawByte: %d (hex: 0x%X)\\n", rawByte, rawByte)
}`;

export const zeroValuesCode = `package main

import "fmt"

type Metrics struct {
	TotalRequests int64
	ErrorRate     float64
	IsDegraded    bool
	ServiceName   string
	LatencyTrace  []int64
	CacheRef      *int
}

func main() {
	var m Metrics

	fmt.Println("TotalRequests:", m.TotalRequests)
	fmt.Println("ErrorRate:    ", m.ErrorRate)
	fmt.Println("IsDegraded:   ", m.IsDegraded)
	fmt.Printf("ServiceName:   %q\\n", m.ServiceName)
	fmt.Println("LatencyTrace: ", m.LatencyTrace == nil)
	fmt.Println("CacheRef:     ", m.CacheRef == nil)
}`;

export const stringsRunesCode = `package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	sample := "Hello, 世界"

	fmt.Println("Byte length:", len(sample))
	fmt.Println("Rune length:", utf8.RuneCountInString(sample))

	for i := 0; i < len(sample); i++ {
		fmt.Printf("%x ", sample[i])
	}
	fmt.Println()

	for idx, r := range sample {
		fmt.Printf("Index %2d: %c (U+%04X)\\n", idx, r, r)
	}
}`;

export const slicesCode = `package main

import "fmt"

func main() {
	fixedArray := [3]string{"us-east-1", "us-west-2", "eu-central-1"}
	fmt.Printf("Array type: %T, len: %d\\n", fixedArray, len(fixedArray))

	dynamicSlice := make([]int, 0, 4)
	fmt.Printf("Slice: len=%d cap=%d\\n", len(dynamicSlice), cap(dynamicSlice))

	for i := 1; i <= 5; i++ {
		dynamicSlice = append(dynamicSlice, i*10)
		fmt.Printf("Appended %d -> len=%d cap=%d\\n", i*10, len(dynamicSlice), cap(dynamicSlice))
	}

	window := dynamicSlice[1:4]
	window[0] = 999
	fmt.Println("Modified dynamicSlice through window:", dynamicSlice)
}`;

export const mapsCode = `package main

import "fmt"

func main() {
	var uninitialized map[string]int
	fmt.Println("Uninitialized is nil:", uninitialized == nil)
	fmt.Println("Read from nil map:", uninitialized["missing"])

	routes := make(map[string]string)
	routes["/health"] = "HealthController"
	routes["/metrics"] = "MetricsController"

	handler, exists := routes["/checkout"]
	if !exists {
		fmt.Println("Route /checkout is not registered")
	} else {
		fmt.Println("Found handler:", handler)
	}

	routes["/checkout"] = "CheckoutController"
	delete(routes, "/health")

	fmt.Println("Total active routes:", len(routes))
}`;

export const structsMemoryCode = `package main

import (
	"fmt"
	"unsafe"
)

type UnalignedUser struct {
	Active  bool
	ID      int64
	Flag    bool
	Score   float64
}

type AlignedUser struct {
	ID      int64
	Score   float64
	Active  bool
	Flag    bool
}

type TenantID int64
type CustomerID int64

func main() {
	var unaligned UnalignedUser
	var aligned AlignedUser

	fmt.Printf("UnalignedUser struct size: %d bytes\\n", unsafe.Sizeof(unaligned))
	fmt.Printf("AlignedUser   struct size: %d bytes\\n", unsafe.Sizeof(aligned))

	var tenant TenantID = 1001
	var customer CustomerID = 1001

	fmt.Println("Tenant ID:", tenant, "Customer ID:", customer)
}`;

export const pointersEscapeCode = `package main

import "fmt"

type Session struct {
	Token string
	TTL   int
}

func createStackSession() Session {
	return Session{Token: "sess_local_456", TTL: 3600}
}

func createHeapSession() *Session {
	sess := Session{Token: "sess_heap_789", TTL: 7200}
	return &sess
}

func extendTTL(s *Session, delta int) {
	s.TTL += delta
}

func main() {
	stackSess := createStackSession()
	heapSess := createHeapSession()

	extendTTL(heapSess, 1800)

	fmt.Printf("Stack Session: %+v\\n", stackSess)
	fmt.Printf("Heap Session:  %+v\\n", *heapSess)
}`;

export const interfacesAnyCode = `package main

import (
	"fmt"
)

type PayloadParser interface {
	Parse(data []byte) (string, error)
}

type JSONParser struct{}

func (j *JSONParser) Parse(data []byte) (string, error) {
	return string(data), nil
}

func demonstrateNilInterfaceTrap() {
	var concrete *JSONParser = nil
	var parser PayloadParser = concrete

	fmt.Println("concrete == nil: ", concrete == nil)
	fmt.Println("parser == nil:   ", parser == nil)
}

func inspectDynamicType(val any) {
	switch v := val.(type) {
	case int:
		fmt.Println("Received integer:", v*2)
	case string:
		fmt.Println("Received string:", len(v))
	case bool:
		fmt.Println("Received boolean:", v)
	default:
		fmt.Printf("Unknown type: %T\\n", v)
	}
}

func main() {
	demonstrateNilInterfaceTrap()

	inspectDynamicType(1024)
	inspectDynamicType("distributed-kv-store")
	inspectDynamicType(true)
}`;
