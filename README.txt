PRAYER MINISTRY MODULE — INTERACTIVE PROTOTYPE
Thriving Communities platform · shown for Charleston United ("Pray Charleston")
================================================================================

WHAT THIS IS
------------
A clickable, high-fidelity preview of the Prayer Ministry module — built so you can
see how every part works before any production code is written. It is a SIMULATION:
there is no database, no login, no real messages or data. Nothing you click sends or
saves anything.

HOW TO OPEN IT
--------------
Double-click  index.html  (opens in any web browser — Chrome, Edge, Safari, Firefox).
Everything runs locally on your computer. No internet connection is required
(with internet, the fonts look slightly nicer; without, it still works).

HOW TO GET AROUND
-----------------
1. START AT THE HUB (index.html). It explains everything and links to every screen.

2. SWITCH WHO YOU ARE. Top-right of every screen is a "Viewing as" menu —
   Public, Ministry Admin, Church Leader, Recorder, Pray-er. Changing it shows
   that person's experience. Start as MINISTRY ADMIN to see the most.

3. TURN NOTES ON/OFF. The "Show notes" button reveals purple margin notes that
   explain what each screen does and what is real vs. simulated. On by default.

4. CLICK THINGS. Buttons, rows, and forms respond (with a confirmation pop) so the
   flow feels real. The public request form and the request inbox are a good pair to
   try first — submit a request as the Public, then open the Ministry Admin's inbox.

THE SCREENS
-----------
Public        public-request.html     The no-login prayer request form
Ministry      admin-dashboard.html     Home / this period at a glance
              admin-requests.html      Requests inbox — routing & stages
              admin-guide.html         Monthly guide — compose & publish
              admin-focus.html         Focus calendar & printable prayer sheet
              admin-churches.html      Churches, leaders & who's gone quiet
              admin-messaging.html     Send one message to a chosen group
              admin-confirmations.html The cross-church confirmation log
              admin-praise.html        Praise report (answered prayer + indicators)
              admin-access.html        Delegated admin access
              admin-charleston.html    Contacting the 1,309 loaded pray-ers safely
Church Leader leader.html              A leader's view of their own congregation
Recorder      recorder.html            Phone-first: log what was sensed in prayer
Pray-er       prayer.html              Phone-first: this week's focus, guide, huddles

The § references on screens (e.g. §9.1) point to the requirements document
PRAYER_MINISTRY_REQUIREMENTS.md.

NOTE
----
This folder is a design prototype for review only. It is deliberately kept outside the
project's code repositories and is not part of any build or deployment.
