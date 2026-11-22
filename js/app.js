"use strict";

// Danh sách ảnh có thật trong thư mục love-n, được cập nhật từ file RAR mới.
const MEMES = [
  "0d43769f685abb2a6347a364db97c6ce.jpg",
  "0f9489fb98a9ab6b0e65523778753608.jpg",
  "3815d68d148c3f56d14970e80124bf8a.jpg",
  "7052eb1b85d4f29b8595b56a49a0bfe9.jpg",
  "71396fb3ef9de7152d59ad5845cd429e.jpg",
  "8147b5ff6ac92c7275062364aeb236c3.jpg",
  "a3bd17f9e404a93b5b096ea9179a1e28.jpg",
  "ab5a79e570a3a773be28b6be7d2c55c5.jpg",
  "caeeb53fc42bf02cf3b001388dfc429c.jpg",
  "dbff30af56bf6462ba45816f9bd835eb.jpg",
  "e917200757a8c40d8ac11baa1d554081.jpg",
  "ec4ea6b2b13a822eea7eebc5b9bd4984.jpg",
  "fa82b951795f0862595927f9cd3a834d.jpg"
];

const NO_MESSAGES = [
  "Em nhấn nhầm No phải không? 🥺",
  "Anh gửi thêm một meme để dỗ em nè! 🎁",
  "Cho anh một cơ hội nha em! 🎄",
  "Ông già Noel cũng ủng hộ anh đó! 🎅",
  "Anh với mèo vẫn đang chờ chữ Yes! 🐱",
  "Anh sắp gọi cả đội meme tới rồi! ❄️",
  "Em chọn Yes là Noel của anh trọn vẹn đó! 💌"
];

function createSnow() {
  const layer = document.getElementById("snowLayer");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const count = window.innerWidth < 700 ? 25 : 45;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.textContent = i % 7 === 0 ? "✦" : "•";
    flake.style.setProperty("--x", `${Math.random() * 100}%`);
    flake.style.setProperty("--drift", `${Math.random() * 70 - 35}px`);
    flake.style.setProperty("--size", `${Math.random() * 9 + 6}px`);
    flake.style.setProperty("--duration", `${Math.random() * 17 + 13}s`);
    flake.style.setProperty("--delay", `${Math.random() * -30}s`);
    flake.style.setProperty("--opacity", `${Math.random() * 0.48 + 0.15}`);
    fragment.appendChild(flake);
  }
  layer.appendChild(fragment);
}

// Xáo trộn để không lặp ảnh cho tới khi đã dùng hết 13 ảnh.
function shuffle(values) {
  const result = values.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function setupQuestion(music) {
  const yes = document.getElementById("yesButton");
  const no = document.getElementById("noButton");
  if (!yes || !no) return; // thankyou.html không có hai nút này.

  const scene = document.getElementById("questionScene");
  const center = scene.querySelector(".center-stage");
  const field = document.getElementById("memeField");
  const answer = document.getElementById("answerMessage");
  const hint = document.getElementById("memeHint");
  const dialog = document.getElementById("memeDialog");
  const largeImage = document.getElementById("largeMemeImage");
  const slotNames = ["left0", "left1", "left2", "left3", "right0", "right1", "right2", "right3"];
  let remainingSlots = shuffle(slotNames);
  let remainingMemes = shuffle(MEMES);
  let previousMeme = "";
  let noCount = 0;
  let peekTimeout;

  function nextMeme() {
    if (!remainingMemes.length) {
      remainingMemes = shuffle(MEMES);
      if (remainingMemes.length > 1 && remainingMemes[remainingMemes.length - 1] === previousMeme) {
        [remainingMemes[0], remainingMemes[remainingMemes.length - 1]] =
          [remainingMemes[remainingMemes.length - 1], remainingMemes[0]];
      }
    }
    previousMeme = remainingMemes.pop();
    return previousMeme;
  }

  // Tính lại vị trí theo kích thước thực của màn hình. Khu vực ở giữa luôn được chừa trống.
  function positionStickers() {
    if (window.matchMedia("(max-width: 960px)").matches) return;
    const sceneBounds = scene.getBoundingClientRect();
    const centerBounds = center.getBoundingClientRect();
    const leftSpace = centerBounds.left - sceneBounds.left;
    const rightStart = centerBounds.right - sceneBounds.left;
    const rightSpace = sceneBounds.right - centerBounds.right;
    const gap = 28;
    const width = Math.max(112, Math.min(172, leftSpace - gap * 2, rightSpace - gap * 2));
    const stickerHeight = width * 0.85 + 24;
    const usableHeight = Math.max(0, sceneBounds.height - stickerHeight - 40);

    field.querySelectorAll(".meme-sticker").forEach((sticker) => {
      const slot = sticker.dataset.slot;
      const right = slot.startsWith("right");
      const row = Number(slot.at(-1));
      const laneStart = right ? rightStart + gap : gap;
      const laneSize = (right ? rightSpace : leftSpace) - gap * 2;
      const factor = Number(sticker.dataset.horizontalFactor);
      const x = laneStart + Math.max(0, laneSize - width) * factor;
      const y = 20 + usableHeight * (row / 3) + Number(sticker.dataset.verticalJitter);
      sticker.style.width = `${width}px`;
      sticker.style.left = `${Math.round(x)}px`;
      sticker.style.top = `${Math.round(y)}px`;
    });
  }

  yes.addEventListener("click", () => {
    // Gọi audio.play() NGAY trong thao tác click để trình duyệt cho phép phát tiếng.
    // Không chuyển trang thật, vì chuyển trang sẽ làm nhạc vừa bật bị ngắt.
    music?.start();
    const template = document.getElementById("celebrationTemplate");
    if (!template) return;
    const memePeek = document.getElementById("mobileMemePeek");
    if (memePeek) memePeek.classList.remove("visible");
    scene.replaceWith(template.content.cloneNode(true));
    document.body.classList.replace("page-question", "page-thankyou");
    document.title = "Cảm ơn em vì đã đồng ý 🎄❤️";
    const topNote = document.querySelector(".topbar-note");
    if (topNote) topNote.innerHTML = '<span class="twinkle" aria-hidden="true">✦</span> the happiest holiday ever';
    const footer = document.querySelector(".site-footer");
    if (footer) footer.innerHTML = '<span aria-hidden="true">✦</span> MERRY CHRISTMAS, MY LOVE <span aria-hidden="true">✦</span>';
    window.scrollTo({ top: 0, behavior: "auto" });
  });

  no.addEventListener("click", () => {
    const filename = nextMeme();
    if (!filename) return;
    noCount += 1;
    // Tối đa 8 sticker để không bị che mất khu vực câu hỏi.
    if (!remainingSlots.length) {
      const oldest = field.querySelector(".meme-sticker");
      if (oldest) {
        remainingSlots.push(oldest.dataset.slot);
        oldest.remove();
      }
    }
    const slot = remainingSlots.splice(Math.floor(Math.random() * remainingSlots.length), 1)[0];
    const sticker = document.createElement("button");
    sticker.type = "button";
    sticker.className = "meme-sticker";
    sticker.dataset.slot = slot;
    sticker.dataset.horizontalFactor = (0.1 + Math.random() * 0.8).toFixed(3);
    sticker.dataset.verticalJitter = (Math.random() * 10 - 5).toFixed(2);
    sticker.style.setProperty("--tilt", `${(Math.random() * 20 - 10).toFixed(1)}deg`);
    sticker.setAttribute("aria-label", `Xem meme thứ ${noCount} lớn hơn`);

    const image = document.createElement("img");
    image.src = `love-n/${filename}`;
    image.alt = `Meme ngẫu nhiên xuất hiện sau lần nhấn No thứ ${noCount}`;
    image.loading = "eager";
    sticker.append(image);
    sticker.addEventListener("click", () => {
      largeImage.src = image.src;
      largeImage.alt = image.alt;
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
    field.appendChild(sticker);
    positionStickers();

    const text = NO_MESSAGES[(noCount - 1) % NO_MESSAGES.length];
    answer.querySelector("span:last-child").textContent = text;
    hint.textContent = `Anh đã gửi ${noCount} meme rồi 🎁 · Nhấn Yes nha em!`;

    if (window.matchMedia("(max-width: 960px)").matches) {
      // Xem meme ngay mà không tự cuộn khỏi nút Yes/No trên điện thoại.
      const peek = document.getElementById("mobileMemePeek");
      const peekImage = document.getElementById("mobileMemePeekImage");
      peekImage.src = image.src;
      peek.classList.add("visible");
      window.clearTimeout(peekTimeout);
      peekTimeout = window.setTimeout(() => peek.classList.remove("visible"), 2400);
    }
  });

  document.getElementById("closeMemeButton").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  window.addEventListener("resize", positionStickers);
  window.addEventListener("load", positionStickers);
}

function setupMusic() {
  const file = String(window.LOVE_CONFIG?.musicFile || "").trim();
  const toggle = document.getElementById("musicToggle");
  if (!file || !toggle) return { start() {} };

  const audio = new Audio(file);
  audio.loop = true;
  audio.preload = "none";
  const updateLabel = () => {
    toggle.textContent = audio.paused ? "♫ Bật nhạc" : "❚❚ Tắt nhạc";
    toggle.setAttribute("aria-pressed", String(!audio.paused));
  };
  audio.addEventListener("play", updateLabel);
  audio.addEventListener("pause", updateLabel);
  audio.addEventListener("error", () => {
    toggle.textContent = "⚠ Kiểm tra nhạc";
    console.warn("Không mở được file nhạc:", file);
  });

  function start() {
    // Chỉ được gọi từ nút Yes (hoặc nút bật lại nhạc SAU khi đã Yes).
    toggle.hidden = false;
    // Không await bất cứ gì trước play(): giữ quyền phát từ cú click Yes.
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch((error) => {
        console.warn("Trình duyệt chưa cho phát nhạc:", error);
        updateLabel(); // Người xem có thể nhấn "Bật nhạc" để thử lại.
      });
    }
  }

  toggle.addEventListener("click", () => {
    if (audio.paused) start();
    else audio.pause();
  });
  updateLabel();
  // Không tự phát trên trang câu hỏi; bấm No cũng không kích hoạt âm thanh.
  return { start };
}

createSnow();
const music = setupMusic();
setupQuestion(music);
