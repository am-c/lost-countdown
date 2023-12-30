function duplicate() {
  const original = document.querySelector('.base');
  const cloneNumber = 5;

  for (let i = 0; i < cloneNumber; i++) {
    const clone = original.cloneNode(true);
    original.remove();

    clone.classList.add('clone', 'clone' + i);

    document.querySelector('.container').appendChild(clone);

    const glyphs = ['glyphs/1.png', 'glyphs/2.png', 'glyphs/3.png', 'glyphs/4.png', 'glyphs/5.png'];
    const addGlyphs = document.createElement('style');
    const afterAnimation = document.createElement('style');
    const addAnimation = document.createElement('style');

    document.head.appendChild(addGlyphs);
    document.head.appendChild(afterAnimation);
    document.head.appendChild(addAnimation);

    const after = `animation-name: slow;
    animation-composition: add;
    animation-fill-mode: forwards;
    animation-iteration-count: unset;
    animation-duration: 1s;
    border: none;`

    setTimeout(() => {
      addGlyphs.textContent = `
        .clone` + i + ` .card::after {
          background-image: url(${glyphs[i]});
        }
        .clone` + i + ` .card::before {
          transition: 0.8s linear;
          background-image: url(${glyphs[i]});
        }
        .clone::before:nth-child(4),.clone:last-child  {
          filter: none;
        }
      `;
      addAnimation.textContent = `
      .clone .card {
        animation-name: animation-flip;
    }
    `;
      document.querySelector('.container').classList.add('highlight');
    }, i + 2 * 800);


    function handleClick() {
      if (document.querySelector('.container').classList.contains('highlight'))
        startTimer();

    }

    function startTimer() {
      setTimeout(() => {
        afterAnimation.textContent = `
        .clone:nth-of-type(4) .card {` + after + `}`;
        document.body.classList.add('pointer-disabled');
      }, 2000);
      setTimeout(function() {
        afterAnimation.textContent = `
        .clone:nth-of-type(4) .card, .clone:nth-of-type(2) .card {` + after + `}`;
      }, 4000);
      setTimeout(function() {
        afterAnimation.textContent = `
        .clone:nth-of-type(4) .card, .clone:nth-of-type(2) .card, .clone:nth-of-type(5) .card  {` + after + `}`;
      }, 6000);
      setTimeout(function() {
        afterAnimation.textContent = `
        .clone:nth-of-type(4) .card, .clone:nth-of-type(2) .card, .clone:nth-of-type(5) .card, .clone:nth-of-type(1) .card  {` + after + `}`;
      }, 8000);
      setTimeout(function() {
        afterAnimation.textContent = `
        .clone:nth-of-type(4) .card, .clone:nth-of-type(2) .card, .clone:nth-of-type(5) .card, .clone:nth-of-type(1) .card, .clone:nth-of-type(3) .card   {` + after + `}`;
        document.body.classList.remove('pointer-disabled');
        document.body.addEventListener('click', reset);
      }, 10000);
    }


    function reset() {
      afterAnimation.textContent = `
.clone:nth-of-type(1) .card, .clone:nth-of-type(2) .card, .clone:nth-of-type(3) .card, .clone:nth-of-type(4) .card, .clone:nth-of-type(5) .card  {
        animation-name: animation-flip;
        animation-iteration-count: infinite;
    };`}
    
    document.body.classList.remove('pointer-disabled');
    document.body.addEventListener('click', handleClick);
    addAnimation.textContent = ``;

  }
}

// Run the function when the page loads
window.onload = function() {
  duplicate();

};
