# LeadVexa — ANJORYX Technologies
Interactive product concept. Run: `npm install && npm run dev` · Build: `npm run build`.

## Book Demo Lead Capture
1. **Service:** [FormSubmit](https://formsubmit.co) via its AJAX endpoint (`https://formsubmit.co/ajax/<email>`). No API key or secret is used or needed.
2. **Destination email:** `CONTACT_EMAIL` in `src/data/config.js`. The endpoint and dropdown options are in the same file.
3. **Required setup before production (manual):** the first submission to a new address makes FormSubmit send an *activation email* to `anjoryx.tech@gmail.com`. Open it and click the confirm link. Until then, real requests are NOT delivered. Check spam too. Optionally use the random alias FormSubmit gives you after activation instead of the plain email, so the address isn't in the endpoint URL.
4. **Test locally:** `npm run dev`, click *Book a Demo*, submit valid data, confirm the activation email (first time), then submit again and check the inbox. To test the error state, go offline and submit.
5. **Debugging:** every submit logs `[LeadVexa] form response <status> <body>` to the browser console. Success is only shown when FormSubmit returns HTTP 200 with `success: "true"`; anything else (including "needs activation") shows the error state with a prefilled `mailto:` fallback.
6. **After success:** the modal shows a "Demo request received" confirmation with a *Back to LeadVexa* button (no redirect). Each email contains the form fields plus `source: Book Demo`.

Notes: spam protection is a hidden `_honey` field only. FormSubmit's CAPTCHA is disabled so the in-page flow works; add a stronger service (e.g. Web3Forms/Formspree with a public key) if spam appears. No data is stored anywhere except your inbox. Do not put secrets in `VITE_*` variables — they are public.
