// !(function () {
//   let itemClassName = 'carousel-item';
//   let items = document.getElementsByClassName(itemClassName);
//   let totalItems = items.length - 1;
//   let slide = 0;
//   let moving = true;
//   // Set initial classes
//   function setInitialClasses() {
//     items[totalItems].classList.add('prev');
//     items[0].classList.add('active');
//     items[1].classList.add('next');
//   }
//   // function to set Event Listener
//   function setEventListener() {
//     let next = document.getElementsByClassName('carousel-control-next')[0];
//     let prev = document.getElementsByClassName('carousel-control-prev')[0];

//     //Add each of them to event Listener
//     next.addEventListener('click', moveNext);
//     prev.addEventListener('click', movePrev);
//   }
//   // Declare function moveNext and movePrev
//   function moveNext() {
//     if (!moving) {
//       if (slide === totalItems) {
//         slide = 0;
//       } else {
//         slide++;
//       }
//       moveCarouselTo(slide);
//     }
//   }

//   function movePrev() {
//     if (!moving) {
//       if (slide === 0) {
//         slide = totalItems;
//       } else {
//         slide--;
//       }
//       moveCarouselTo(slide);
//     }
//   }

//   // Declare function to disable interaction
//   function disableInteraction() {
//     moving = true;
//     setTimeout(function () {
//       moving = false;
//     }, 500);
//   }

//   //Declare function to actually move carousel
//   function moveCarouselTo(slide) {
//     if (!moving) {
//       // Disable Interaction
//       disableInteraction();
//       // Declare preemptive variables
//       let newPrevious = slide - 1;
//       let newNext = slide + 1;
//       let oldPrevious = slide - 2;
//       let oldNext = slide + 2;
//       // Check if slide has more than three element
//       if (totalItems > 3) {
//         // Check them back in position if they overflowed
//         if (newPrevious <= 0) {
//           oldPrevious = totalItems;
//         } else if (newNext >= totalItems) {
//           oldNext = 0;
//         }
//         // Check if slide is at the beginning or end
//         if (slide === 0) {
//           newPrevious = totalItems;
//           oldPrevious = totalItems - 1;
//           newNext = slide + 1;
//         } else if (slide === totalItems) {
//           newPrevious = slide - 1;
//           newNext = 0;
//           oldNext = 1;
//         }
//         //Set initial classes
//         items[oldPrevious].className = itemClassName;
//         items[oldNext].className = itemClassName;

//         //Set and assigning new classes
//         items[newPrevious].className = itemClassName + ' prev';
//         items[slide].className = itemClassName + ' active';
//         items[newNext].className = itemClassName + ' next';
//       }
//     }
//   }

//   // Declare initial function to kick everything
//   function initCarousel() {
//     setInitialClasses();
//     setEventListener();

//     //Change moving to false
//     moving = false;
//   }
//   initCarousel();
// })(document);

const questions = document.querySelectorAll('.faq-question');

// Display FAQS answer when clicked
Array.from(questions).forEach((el) => {
  el.addEventListener('click', function () {
    el.nextElementSibling.classList.toggle('display-answer');
  });
});
