export const date = "18 Nov 2026";

export const tableOfContent = [
	{
		num: "01",
		id: "arrays-vs-slices",
		label: "Arrays vs. Slices: The Core Difference",
	},
	{
		num: "02",
		id: "slice-header-memory-layout",
		label: "The 3-Word Slice Header",
	},
	{
		num: "03",
		id: "creating-and-allocating",
		label: "Creating Slices: Literal, make & nil",
	},
	{
		num: "04",
		id: "the-mechanics-of-append",
		label: "How append Works & Capacity Growth",
	},
	{
		num: "05",
		id: "shared-storage-and-mutations",
		label: "Shared Storage & The 3-Index Slice",
	},
	{
		num: "06",
		id: "copying-and-memory-leaks",
		label: "copy() & Preventing Memory Leaks",
	},
	{
		num: "07",
		id: "modern-slices-package",
		label: "Go 1.21+ slices Standard Package",
	},
	{
		num: "08",
		id: "slice-best-practices",
		label: "Practical Best Practices",
	},
];

export const calloutArrayValueType = [
	{
		k: "ARRAYS ARE VALUE TYPES",
		d: "In Go, an array's length is part of its type. Passing [1000]int to a function copies all 1,000 integers. Slices solve this by passing a lightweight 24-byte descriptor pointing to a backing array.",
		bad: false,
		title: "MEMORY MECHANICS",
	},
];

export const calloutSharedBackingTrap = [
	{
		k: "THE SHARED BACKING ARRAY TRAP",
		d: "Slicing an existing slice does not allocate new memory; it creates a new slice header pointing to the exact same backing array. Modifying an element through the sub-slice silently mutates the original slice.",
		bad: true,
		title: "MUTATION HAZARD",
	},
];

export const calloutMemoryRetentionLeak = [
	{
		k: "THE BACKING ARRAY RETENTION LEAK",
		d: "Keeping a small 4-byte slice from a 1MB buffer prevents the garbage collector from freeing the entire 1MB buffer. Always copy small sub-slices that outlive the original buffer.",
		bad: true,
		title: "GARBAGE COLLECTION TRAP",
	},
];

export const breadcrumbs = [
	{ link: "/blog", text: "Blog" },
	{ link: "/blog/golang/introduction-to-golang", text: "Golang" },
	{ link: "", text: "Arrays and Slices" },
];

export const arraysVsSlicesCode = `package main

import "fmt"

func modifyArray(arr [3]int) {
	arr[0] = 999
}

func modifySlice(s []int) {
	s[0] = 999
}

func main() {
	fixedArr := [3]int{10, 20, 30}
	modifyArray(fixedArr)
	fmt.Printf("Array after modifyArray: %v\\n", fixedArr)
	// Output: Array after modifyArray: [10 20 30]

	dynSlice := []int{10, 20, 30}
	modifySlice(dynSlice)
	fmt.Printf("Slice after modifySlice: %v\\n", dynSlice)
	// Output: Slice after modifySlice: [999 20 30]

	fmt.Printf("Array type: %T, Slice type: %T\\n", fixedArr, dynSlice)
	// Output: Array type: [3]int, Slice type: []int
}`;

export const sliceHeaderCode = `package main

import "fmt"

func inspect(label string, s []int) {
	fmt.Printf("%-12s len=%d cap=%d data=%v\\n", label, len(s), cap(s), s)
}

func tryAppend(s []int) {
	s = append(s, 999)
	inspect("inside func", s)
	// Output: inside func  len=4 cap=5 data=[100 200 300 999]
}

func main() {
	numbers := make([]int, 3, 5)
	numbers[0] = 100
	numbers[1] = 200
	numbers[2] = 300

	inspect("initial", numbers)
	// Output: initial      len=3 cap=5 data=[100 200 300]

	tryAppend(numbers)

	inspect("after func", numbers)
	// Output: after func   len=3 cap=5 data=[100 200 300]

	sub := numbers[0:4]
	inspect("resliced", sub)
	// Output: resliced     len=4 cap=5 data=[100 200 300 999]
}`;

export const creatingSlicesCode = `package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	var nilSlice []string
	emptyLiteral := []string{}
	emptyMake := make([]string, 0)

	fmt.Printf("nilSlice:     len=%d cap=%d isNil=%t\\n", len(nilSlice), cap(nilSlice), nilSlice == nil)
	// Output: nilSlice:     len=0 cap=0 isNil=true

	fmt.Printf("emptyLiteral: len=%d cap=%d isNil=%t\\n", len(emptyLiteral), cap(emptyLiteral), emptyLiteral == nil)
	// Output: emptyLiteral: len=0 cap=0 isNil=false

	fmt.Printf("emptyMake:    len=%d cap=%d isNil=%t\\n", len(emptyMake), cap(emptyMake), emptyMake == nil)
	// Output: emptyMake:    len=0 cap=0 isNil=false

	nilJSON, _ := json.Marshal(nilSlice)
	emptyJSON, _ := json.Marshal(emptyLiteral)

	fmt.Printf("nilSlice JSON:     %s\\n", string(nilJSON))
	// Output: nilSlice JSON:     null

	fmt.Printf("emptyLiteral JSON: %s\\n", string(emptyJSON))
	// Output: emptyLiteral JSON: []

	preallocated := make([]int, 0, 5)
	fmt.Printf("preallocated: len=%d cap=%d\\n", len(preallocated), cap(preallocated))
	// Output: preallocated: len=0 cap=5
}`;

export const appendGrowthCode = `package main

import "fmt"

func main() {
	var s []int

	for i := 1; i <= 6; i++ {
		prevCap := cap(s)
		s = append(s, i)
		if cap(s) != prevCap {
			fmt.Printf("Item %d -> len=%d, cap grew: %d -> %d\\n", i, len(s), prevCap, cap(s))
		} else {
			fmt.Printf("Item %d -> len=%d, cap unchanged: %d\\n", i, len(s), cap(s))
		}
	}
	// Output:
	// Item 1 -> len=1, cap grew: 0 -> 1
	// Item 2 -> len=2, cap grew: 1 -> 2
	// Item 3 -> len=3, cap grew: 2 -> 4
	// Item 4 -> len=4, cap unchanged: 4
	// Item 5 -> len=5, cap grew: 4 -> 8
	// Item 6 -> len=6, cap unchanged: 8
}`;

export const subSliceThreeIndexCode = `package main

import "fmt"

func main() {
	raw := []int{10, 20, 30, 40, 50}

	subShared := raw[1:3]
	subShared[0] = 999
	fmt.Printf("Mutated subShared: %v\\n", subShared)
	// Output: Mutated subShared: [999 30]

	fmt.Printf("Original raw after mutation: %v\\n", raw)
	// Output: Original raw after mutation: [10 999 30 40 50]

	safe := []int{10, 20, 30, 40, 50}
	subRestricted := safe[1:3:3]
	fmt.Printf("subRestricted: len=%d cap=%d\\n", len(subRestricted), cap(subRestricted))
	// Output: subRestricted: len=2 cap=2

	subRestricted = append(subRestricted, 888)
	fmt.Printf("subRestricted after append: %v\\n", subRestricted)
	// Output: subRestricted after append: [20 30 888]

	fmt.Printf("Original safe untouched:     %v\\n", safe)
	// Output: Original safe untouched:     [10 20 30 40 50]
}`;

export const copyAndLeakCode = `package main

import "fmt"

func extractHeaderLeaky(fullData []byte) []byte {
	return fullData[:4]
}

func extractHeaderSafe(fullData []byte) []byte {
	header := make([]byte, 4)
	copy(header, fullData[:4])
	return header
}

func main() {
	largeBuffer := make([]byte, 1000000)
	copy(largeBuffer, "POST /api/v1/checkout HTTP/1.1")

	leakyHeader := extractHeaderLeaky(largeBuffer)
	safeHeader := extractHeaderSafe(largeBuffer)

	fmt.Printf("leakyHeader: len=%d cap=%-7d text=%s\\n", len(leakyHeader), cap(leakyHeader), string(leakyHeader))
	// Output: leakyHeader: len=4 cap=1000000 text=POST

	fmt.Printf("safeHeader:  len=%d cap=%-7d text=%s\\n", len(safeHeader), cap(safeHeader), string(safeHeader))
	// Output: safeHeader:  len=4 cap=4       text=POST

	src := []int{1, 2, 3, 4, 5}
	dst := make([]int, 3)
	copied := copy(dst, src)
	fmt.Printf("Copied %d elements: %v\\n", copied, dst)
	// Output: Copied 3 elements: [1 2 3]
}`;

export const modernSlicesPkgCode = `package main

import (
	"fmt"
	"slices"
)

func main() {
	numbers := []int{42, 13, 88, 5, 27}

	found := slices.Contains(numbers, 88)
	fmt.Printf("slices.Contains(88): %t\\n", found)
	// Output: slices.Contains(88): true

	slices.Sort(numbers)
	fmt.Printf("slices.Sort: %v\\n", numbers)
	// Output: slices.Sort: [5 13 27 42 88]

	cloned := slices.Clone(numbers)
	fmt.Printf("slices.Equal: %t\\n", slices.Equal(numbers, cloned))
	// Output: slices.Equal: true

	withoutIndexOne := slices.Delete(cloned, 1, 2)
	fmt.Printf("slices.Delete index 1: %v\\n", withoutIndexOne)
	// Output: slices.Delete index 1: [5 27 42 88]

	duplicates := []int{1, 1, 2, 2, 3, 3, 3, 4}
	compacted := slices.Compact(duplicates)
	fmt.Printf("slices.Compact: %v\\n", compacted)
	// Output: slices.Compact: [1 2 3 4]
}`;
