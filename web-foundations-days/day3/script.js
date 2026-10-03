let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) { 
    return notes.filter(note => note.text.toLowerCase().includes(word.toLowerCase()) ); 
}

console.log(searchNotes("javascript")); 
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]
console.log(searchNotes("pizza")); 
// Expected: []

function longestNote() { 
    if (notes.length === 0) { 
        return null;
    } 
    let longest = notes[0]; 
    for (let note of notes) { 
        if (note.text.length > longest.text.length) { 
            longest = note; 
        } 
    } 
    return longest;
 }

 console.log(longestNote());
 // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }


let originalNotes = notes;
  notes = []; 
  console.log(longestNote());
  // Expected: null

notes = originalNotes;
function countByCategory() { 
    let counts = {};
    for (let note of notes) { 
        if (counts[note.category]) {
             counts[note.category]++;
        } 
         else {
             counts[note.category] = 1; 
        } 
    } 
    return counts;
 } 

 console.log(countByCategory()); 
 // Expected: { personal: 2, study: 2, work: 1 } 
 console.log(countByCategory().unknown || 0); 
 // Expected: 0

function getSummary() { 
    let counts = countByCategory();
    let word = notes.length === 1 ? "note" : "notes";
     return `${notes.length} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
     }
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study." 
originalNotes = notes; notes = [{ id: 6, text: "Study", category: "study" }]; 
console.log(getSummary()); 
// Expected: "1 note: 0 personal, 0 work, 1 study." notes = originalNotes;


function isDuplicate(text) {
     return notes.some(note => note.text.trim().toLowerCase() === text.trim().toLowerCase()
     );
}
console.log(isDuplicate(" CALL MUM "));
// Expected: true 

console.log(isDuplicate("Go to the gym")); 
// Expected: false


function addNote(text, category) { 
    let trimmedText = text.trim();
    let validCategories = ["personal", "work", "study"];
     if (trimmedText.length < 1 || trimmedText.length > 200) {
         console.log("Note must be between 1 and 200 characters.");
          return false; 
    } 
    if (isDuplicate(trimmedText)) {
         console.log("Note is a duplicate."); 
         return false;
    } 
    if (!validCategories.includes(category)) { 
        console.log("Invalid category.");
         return false; 
    } 
    let newId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
     notes.push({ id: newId, text: trimmedText, category: category }); 
     return true;
     } 
     console.log(addNote("Prepare for exams", "study"));
     // Expected: true


console.log(addNote(" CALL MUM ", "personal")); 
// Expected: false, logs "Note is a duplicate." 

console.log(addNote("", "study")); 
// Expected: false, logs "Note must be between 1 and 200 characters." 

console.log(addNote("Buy a new laptop", "invalid"));
 // Expected: false, logs "Invalid category."
