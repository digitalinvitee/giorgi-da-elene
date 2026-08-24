/* =========================================================
   INVITÉ — WEDDING INVITATION
   T & M
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const opening = document.getElementById('opening');
  const invitation = document.getElementById('invitation');

  const openInvitation =
    document.getElementById('openInvitation');

  const musicButton =
    document.getElementById('musicButton');

  const weddingMusic =
    document.getElementById('weddingMusic');

  const detailsButton =
    document.getElementById('detailsButton');

  const rsvpButton =
    document.getElementById('rsvpButton');

  const detailsModal =
    document.getElementById('detailsModal');

  const rsvpModal =
    document.getElementById('rsvpModal');

  const rsvpForm =
    document.getElementById('rsvpForm');

  const rsvpStatus =
    document.getElementById('rsvpStatus');


  /* =======================================================
     STATE
  ======================================================= */

  let isTransitioning = false;


  /* =======================================================
     BODY
  ======================================================= */

  function lockBody() {
    document.body.classList.add('locked');
  }

  function unlockBody() {
    document.body.classList.remove('locked');
  }


  /* =======================================================
     MUSIC BUTTON
  ======================================================= */

  function setMusicButtonState(playing) {

    if (!musicButton) return;

    musicButton.classList.toggle(
      'is-playing',
      playing
    );

    musicButton.setAttribute(
      'aria-pressed',
      String(playing)
    );

    musicButton.setAttribute(
      'aria-label',
      playing
        ? 'მუსიკის გამორთვა'
        : 'მუსიკის ჩართვა'
    );
  }


  /* =======================================================
     PLAY MUSIC
  ======================================================= */

  function playMusic() {

    if (!weddingMusic) {
      setMusicButtonState(false);
      return;
    }

    weddingMusic.volume = 0.65;

    const promise = weddingMusic.play();

    if (promise !== undefined) {

      promise
        .then(() => {

          setMusicButtonState(true);

        })
        .catch((error) => {

          console.log(
            'Music playback was blocked:',
            error
          );

          setMusicButtonState(false);
        });

    } else {

      setMusicButtonState(true);
    }
  }


  /* =======================================================
     PAUSE MUSIC
  ======================================================= */

  function pauseMusic() {

    if (!weddingMusic) return;

    weddingMusic.pause();

    setMusicButtonState(false);
  }


  /* =======================================================
     MUSIC CONTROL
  ======================================================= */

  musicButton?.addEventListener(
    'click',
    (event) => {

      event.preventDefault();
      event.stopPropagation();

      if (!weddingMusic) return;

      if (weddingMusic.paused) {

        playMusic();

      } else {

        pauseMusic();

      }
    }
  );


  /* =======================================================
     OPEN INVITATION
  ======================================================= */

  function openInvite() {

    if (isTransitioning) return;

    isTransitioning = true;

    if (opening) {
      opening.classList.add('is-hidden');
    }

    if (invitation) {

      invitation.classList.add('is-visible');

      invitation.setAttribute(
        'aria-hidden',
        'false'
      );
    }

    unlockBody();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    playMusic();

    setTimeout(() => {

      if (opening) {
        opening.style.display = 'none';
      }

      isTransitioning = false;

    }, 900);
  }


  /* =======================================================
     OPEN INVITATION CLICK
  ======================================================= */

  openInvitation?.addEventListener(
    'click',
    (event) => {

      event.preventDefault();

      openInvite();
    }
  );


  /* =======================================================
     OPEN INVITATION — KEYBOARD
  ======================================================= */

  openInvitation?.addEventListener(
    'keydown',
    (event) => {

      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {

        event.preventDefault();

        openInvite();
      }
    }
  );


  /* =======================================================
     MODAL OPEN
  ======================================================= */

  function openModal(modal) {

    if (!modal) {
      console.error('Modal not found.');
      return;
    }

    modal.classList.add('is-open');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );

    lockBody();

    console.log(
      'Modal opened:',
      modal.id
    );
  }


  /* =======================================================
     MODAL CLOSE
  ======================================================= */

  function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove('is-open');

    modal.setAttribute(
      'aria-hidden',
      'true'
    );

    if (
      !opening ||
      opening.style.display === 'none'
    ) {

      unlockBody();

    } else {

      lockBody();
    }
  }


  /* =======================================================
     DETAILS MODAL
  ======================================================= */

  detailsButton?.addEventListener(
    'click',
    (event) => {

      event.preventDefault();
      event.stopPropagation();

      openModal(detailsModal);
    }
  );


  /* =======================================================
     DETAILS — KEYBOARD
  ======================================================= */

  detailsButton?.addEventListener(
    'keydown',
    (event) => {

      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {

        event.preventDefault();

        openModal(detailsModal);
      }
    }
  );


  /* =======================================================
     RSVP MODAL
  ======================================================= */

  rsvpButton?.addEventListener(
    'click',
    (event) => {

      event.preventDefault();
      event.stopPropagation();

      openModal(rsvpModal);
    }
  );


  /* =======================================================
     RSVP — KEYBOARD
  ======================================================= */

  rsvpButton?.addEventListener(
    'keydown',
    (event) => {

      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {

        event.preventDefault();

        openModal(rsvpModal);
      }
    }
  );


  /* =======================================================
     CLOSE BUTTONS
  ======================================================= */

  document
    .querySelectorAll('[data-close]')
    .forEach((button) => {

      button.addEventListener(
        'click',
        (event) => {

          event.preventDefault();
          event.stopPropagation();

          const modalId =
            button.getAttribute('data-close');

          const modal =
            document.getElementById(modalId);

          closeModal(modal);
        }
      );

    });


  /* =======================================================
     CLOSE MODAL BY CLICKING OUTSIDE
  ======================================================= */

  document
    .querySelectorAll('.modal-overlay')
    .forEach((modal) => {

      modal.addEventListener(
        'click',
        (event) => {

          if (
            event.target === modal
          ) {

            closeModal(modal);
          }

        }
      );

    });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    'keydown',
    (event) => {

      if (event.key !== 'Escape') return;

      const activeModal =
        document.querySelector(
          '.modal-overlay.is-open'
        );

      if (activeModal) {
        closeModal(activeModal);
      }
    }
  );


  /* =======================================================
     GOOGLE SHEETS
  ======================================================= */

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxRCr0jDHNXNWg8J4xTU0mu0A-Gdwg2PpJY_yY-mHjyZh6EuCDs27TxH0aynIamPg7d/exec';


  /* =======================================================
     RSVP FORM
  ======================================================= */

  rsvpForm?.addEventListener(
    'submit',
    async (event) => {

      event.preventDefault();

      const submitButton =
        rsvpForm.querySelector(
          '.rsvp-submit'
        );

      const formData =
        new FormData(rsvpForm);


      /* -----------------------------------------------
         CLEAR STATUS
      ----------------------------------------------- */

      if (rsvpStatus) {
        rsvpStatus.textContent = '';
      }


      /* -----------------------------------------------
         BUTTON
      ----------------------------------------------- */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          'იგზავნება...';
      }


      /* -----------------------------------------------
         PREPARE DATA
      ----------------------------------------------- */

      const data = {

        name:
          formData.get('name') ||
          formData.get('fullName') ||
          formData.get('სახელი და გვარი') ||
          '',

        attendance:
          formData.get('attendance') ||
          formData.get('rsvp') ||
          formData.get('დასწრება') ||
          '',

        comment:
          formData.get('comment') ||
          formData.get('message') ||
          formData.get('კომენტარი / სურვილი') ||
          ''
      };


      /* -----------------------------------------------
         SEND TO GOOGLE SHEETS
      ----------------------------------------------- */

      try {

        await fetch(
          GOOGLE_SCRIPT_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'text/plain;charset=utf-8'
            },

            body: JSON.stringify(data),

            mode: 'no-cors'
          }
        );


        /* -------------------------------------------
           SUCCESS
        ------------------------------------------- */

        if (submitButton) {

          submitButton.disabled = true;

          submitButton.textContent =
            'გმადლობთ, თქვენი პასუხი მიღებულია ❤️';
        }

        rsvpForm.reset();


      } catch (error) {

        console.error(
          'Google Sheets RSVP error:',
          error
        );


        if (rsvpStatus) {

          rsvpStatus.textContent =
            'დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.';

          rsvpStatus.style.display =
            'block';
        }


        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            'პასუხის გაგზავნა';
        }
      }

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  lockBody();


  if (opening) {

    opening.classList.remove(
      'is-hidden'
    );

    opening.style.display = '';
  }


  if (invitation) {

    invitation.classList.remove(
      'is-visible'
    );

    invitation.setAttribute(
      'aria-hidden',
      'true'
    );
  }


  if (detailsModal) {

    detailsModal.classList.remove(
      'is-open'
    );

    detailsModal.setAttribute(
      'aria-hidden',
      'true'
    );
  }


  if (rsvpModal) {

    rsvpModal.classList.remove(
      'is-open'
    );

    rsvpModal.setAttribute(
      'aria-hidden',
      'true'
    );
  }


  setMusicButtonState(false);


  /* =======================================================
     DEBUG
  ======================================================= */

  console.log(
    'INVITÉ — T & M initialized successfully.'
  );

  console.log(
    'Details button:',
    !!detailsButton
  );

  console.log(
    'Details modal:',
    !!detailsModal
  );

  console.log(
    'RSVP button:',
    !!rsvpButton
  );

  console.log(
    'RSVP modal:',
    !!rsvpModal
  );

});