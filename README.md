# PC Interactive Trench Book

## Author: Blair Huang

## Conception
This project came to be when Anthony Tuck came up to Cole Reilly and me and proposed the idea of creating a more user-friendly experience for trench book readers. OpenContext currently hosts all trench book scans (from the years where transcription from writing to typed letters wasn't yet available, think the early years), but the user experience isn't the most intuitive: to move from page-to-page, the user will have to scroll down and click on a hyperlink and be taken to a new page. Furthermore, the references in these trench books (such as the finds, loci, etc.) are stored separately and cannot be easily referenced to by the reader. To ameliorate the user experience, we have decided to undergo this project.

## About
The goal of this goal is to mimic the action of flipping through a book in real life while providing the additional information associated with the objects, loci, and other references mentioned on the pages.

## Process:
- As I started the project, I looked to archive.org for implementation and inspiration. They provided the experience that I think this project aims to bring for trench book readers. Currently, the files are all stored in this repo, and all calls for image sources (the page scans) are local paths. I downloaded the trench book scans from OpenContext and manually renamed them. Its a small amount, with only 12 pages used as example.
- Using Javascript, HTML, and CSS, I built a prototype for what the webpage would look like. The images are stored together in the same folder with the naming scheme (year)+TrenchBookP+(page number).jpg (currently locally). This is important as each call to a new page uses direct pathnames. I’m not sure if this is the most efficient way and whether it will scale nicely. My initial thought was to use a double-y linked list, though that seemed to be inefficient as I had to load the images into the data structure asynchronously, which took a lot of time. Furthermore, the loading worked but only when running the Javascript file; the methods returned undefined when incorporated into the HTML file. I then tried with an Array, though it ran into the same problems as the linked list. 
- The center of the page is an interactive gallery that allows the user to flip through the trench pages. Just below the image is a slider, offering an alternative way to go quickly through the pages. Scrolling down a little will reveal the metadata and citing information. 