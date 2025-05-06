// @ts-ignore
import ReadText from 'text-from-image';

ReadText('../Tesoro01-1969/Tesoro011969P0.jpg')
  .then(text => {
    console.log(text);
  })
  .catch(err => {
    console.error(err);
});