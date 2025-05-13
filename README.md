# In the Magazzino: Poggio Civitate Interactive Trench Book 

## Conception
This project came to be when Anthony Tuck came up to Cole Reilly and me and proposed the idea of creating a more user-friendly experience for trench book readers. OpenContext currently hosts all trench book scans (from the years where transcription from writing to typed letters wasn't yet available, think the early years), but the user experience isn't the most intuitive: to move from page-to-page, the user will have to scroll down and click on a hyperlink and be taken to a new page. Furthermore, the references in these trench books (such as the finds, loci, etc.) are stored separately and cannot be easily referenced to by the reader. To ameliorate the user experience, we have decided to undergo this project.

## About
The goal of this goal is to mimic the action of flipping through a book in real life while providing the additional information associated with the objects, loci, and other references mentioned on the pages.

## Process
- As I started the project, I looked to archive.org for implementation and inspiration. They provided the experience that I think this project aims to bring for trench book readers. Currently, the files are all stored in this repo, and all calls for image sources (the page scans) are local paths. I downloaded the trench book scans from OpenContext and manually renamed them. Its a small amount, with only 12 pages used as example.
- Using Javascript, HTML, and CSS, I built a prototype for what the webpage would look like. The images are stored together in the same folder with the naming scheme (year)+TrenchBookP+(page number).jpg (currently locally). This is important as each call to a new page uses direct pathnames. I’m not sure if this is the most efficient way and whether it will scale nicely. My initial thought was to use a double-y linked list, though that seemed to be inefficient as I had to load the images into the data structure asynchronously, which took a lot of time. Furthermore, the loading worked but only when running the Javascript file; the methods returned undefined when incorporated into the HTML file. I then tried with an Array, though it ran into the same problems as the linked list. 
- The center of the page is an interactive gallery that allows the user to flip through the trench pages. Just below the image is a slider, offering an alternative way to go quickly through the pages. Scrolling down a little will reveal the metadata and citing information. 

## Going Forward
- The goal is to scale the project to support trench books from previous seasons as well as future seasons to come. I have set up the database where the assets lie in a cloud database - AWS S3 - while the metadata lies in another - SQLite for now. The metadata also stores the image url to fetch images from the cloud database. Some   benefits for using a cloud database include intuitive uploading for subsequent seasons as well as isolating components in the backend.
- The metadata fields can be refined via searching for key words in text scans and adding tags internally to each page to augment searching experiences. Say a user is doing research on spindle whorls, they can find the relevant pages via searching "spindle whorls". 

## Acknowledgements
- This project is used to fulfill the Honors Thesis requirement for the University of Massachusetts Amherst Commonwealth Honors College.
- I want to extend my most heartfelt gratitude to my parents and sisters Daphne and Peggy; primary advisor Cole Reilly; secondary advisor Anthony Tuck; academic advisors Cody Olson and Isaac Goldstein; OpenContext founder Eric Kansa; Poggio Civitate members Kate Kriendler and Anne Glennie; and my friends and professors for making this project possible.
