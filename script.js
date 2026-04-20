const imageFiles = [
  "WhatsApp Image 2026-04-20 at 12.02.29 PM (1).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.29 PM.jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.30 PM (1).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.30 PM (2).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.30 PM.jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.31 PM (1).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.31 PM.jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.32 PM (1).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.32 PM (2).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.32 PM (3).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.32 PM.jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.33 PM (1).jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.33 PM.jpeg",
  "WhatsApp Image 2026-04-20 at 12.02.34 PM.jpeg"
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const quoteForm = document.getElementById("quoteForm");
const quoteStatus = document.getElementById("quoteStatus");
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const siteHeader = document.querySelector(".site-header");

function buildGallery() {
  if (!gallery) {
    return;
  }

  const fragment = document.createDocumentFragment();

  imageFiles.forEach((fileName, index) => {
    const figure = document.createElement("figure");
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = `images/${encodeURIComponent(fileName)}`;
    img.alt = `Road-Link trellis door project ${index + 1}`;
    img.loading = "lazy";

    button.type = "button";
    button.setAttribute("aria-label", `Open project image ${index + 1}`);
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(img.src, img.alt));

    figure.appendChild(button);
    fragment.appendChild(figure);
  });

  gallery.appendChild(fragment);
}

function openLightbox(src, altText) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = altText;

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function closeModal() {
  if (!lightbox) {
    return;
  }

  if (typeof lightbox.close === "function") {
    lightbox.close();
  }
}

function handleQuoteSubmit(event) {
  event.preventDefault();

  if (!quoteForm || !quoteStatus) {
    return;
  }

  if (!quoteForm.checkValidity()) {
    quoteStatus.textContent = "Please complete all fields before sending your quote request.";
    return;
  }

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const measurements = document.getElementById("measurements").value.trim();

  const message = [
    "Hello Road-Link, I need a trellis door quote:",
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Measurements: ${measurements}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/267797221713?text=${encodeURIComponent(message)}`;
  quoteStatus.textContent = "Opening WhatsApp with your quote details...";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

function appendMessage(text, sender) {
  if (!chatMessages) {
    return;
  }

  const p = document.createElement("p");
  p.className = `msg ${sender}`;
  p.textContent = text;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("price") || text.includes("cost") || text.includes("quote")) {
    return "Pricing depends on opening size and finish. Use the quote form and we will provide a fast estimate.";
  }

  if (text.includes("color") || text.includes("colour") || text.includes("finish")) {
    return "We offer powder-coated steel in assorted colours. Tell us your preferred colour in the quote form.";
  }

  if (text.includes("time") || text.includes("install") || text.includes("day")) {
    return "Installation time depends on quantity and sizes. Most single-door jobs are completed within a day.";
  }

  if (text.includes("lock") || text.includes("secure") || text.includes("security")) {
    return "Our systems use strong steel construction with double uprights and two locking points for added security.";
  }

  if (text.includes("measure") || text.includes("size") || text.includes("width") || text.includes("height")) {
    return "Please share width x height for each opening, for example 900mm x 2100mm. We can also assist during site assessment.";
  }

  if (text.includes("phone") || text.includes("call") || text.includes("contact") || text.includes("whatsapp")) {
    return "You can call 079 722 1713 or WhatsApp us directly using the contact buttons on this page.";
  }

  return "Thanks for your message. For exact advice, please send your details through the quote form or call 079 722 1713.";
}

function handleChatSubmit(event) {
  event.preventDefault();

  if (!chatInput) {
    return;
  }

  const userText = chatInput.value.trim();

  if (!userText) {
    return;
  }

  appendMessage(userText, "user");
  chatInput.value = "";

  window.setTimeout(() => {
    appendMessage(getBotReply(userText), "bot");
  }, 220);
}

function toggleChatPanel() {
  if (!chatPanel || !chatToggle) {
    return;
  }

  const isHidden = chatPanel.hasAttribute("hidden");

  if (isHidden) {
    openChatPanel();
  } else {
    closeChatPanel();
  }
}

function openChatPanel() {
  if (!chatPanel || !chatToggle) {
    return;
  }

  chatPanel.removeAttribute("hidden");
  chatToggle.setAttribute("aria-expanded", "true");

  if (chatInput) {
    chatInput.focus();
  }
}

function closeChatPanel() {
  if (!chatPanel || !chatToggle) {
    return;
  }

  chatPanel.setAttribute("hidden", "");
  chatToggle.setAttribute("aria-expanded", "false");
}

function getHeaderOffset() {
  if (!siteHeader) {
    return 0;
  }

  const style = window.getComputedStyle(siteHeader);
  const isOverlayingHeader = style.position === "sticky" || style.position === "fixed";

  return isOverlayingHeader ? siteHeader.offsetHeight + 10 : 0;
}

function scrollToSection(hash) {
  if (hash === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (hash === "#pageBottom") {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  const headerOffset = getHeaderOffset();
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth"
  });
}

function enableSmoothAnchorScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");

      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);

      if (!target) {
        if (hash === "#home" || hash === "#pageBottom") {
          event.preventDefault();
          scrollToSection(hash);
          window.history.replaceState(null, "", hash);
        }
        return;
      }

      event.preventDefault();
      scrollToSection(hash);
      window.history.replaceState(null, "", hash);
    });
  });
}

if (closeLightbox) {
  closeLightbox.addEventListener("click", closeModal);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    const bounds = lightbox.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      closeModal();
    }
  });

  lightbox.addEventListener("cancel", closeModal);
}

if (quoteForm) {
  quoteForm.addEventListener("submit", handleQuoteSubmit);
}

if (chatToggle) {
  chatToggle.addEventListener("click", toggleChatPanel);
}

if (chatClose) {
  chatClose.addEventListener("click", closeChatPanel);
}

if (chatForm) {
  chatForm.addEventListener("submit", handleChatSubmit);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeChatPanel();
  }
});

document.addEventListener("click", (event) => {
  if (!chatPanel || chatPanel.hasAttribute("hidden")) {
    return;
  }

  const clickedInsidePanel = chatPanel.contains(event.target);
  const clickedToggle = chatToggle ? chatToggle.contains(event.target) : false;

  if (!clickedInsidePanel && !clickedToggle) {
    closeChatPanel();
  }
});

buildGallery();
enableSmoothAnchorScroll();
