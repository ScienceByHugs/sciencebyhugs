# Pulse policy publishing

This branch prepares static policy routes on the existing GitHub Pages site. It does not publish them until merged into main. All pages are visibly marked draft and noindex.

Before merging: confirm the sole proprietor’s full legal name and working privacy/legal inbox; choose the public mailing address; verify provider retention and request/appeal procedures; finalize US-only, 18+ wording and matching app controls; review policies against actual released behavior. Replace draft markers and set effective dates only after finalization.

Add distinct homepage Consumer Health Privacy and other policy links when finalized. Store URLs will be https://sciencebyhugs.com/pulse/privacy/ and https://sciencebyhugs.com/pulse/delete-account/.

Content was copied from Pulse src/content/legal.json. Keep native and website policy versions synchronized. These pages use no JavaScript, analytics, external fonts or cookies. The existing homepage service worker bypasses /pulse/ so a policy cannot corrupt the cached homepage or show the homepage when offline. GitHub hosting can process connection logs.
