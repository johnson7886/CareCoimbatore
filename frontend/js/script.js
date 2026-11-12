document.addEventListener("DOMContentLoaded", loadHospitals);

async function loadHospitals() {
  const select = document.getElementById("hospital");
  try {
    const res = await fetch("../backend/get_hospitals.php");
    const hospitals = await res.json();
    window.hospitalsData = hospitals;
    hospitals.forEach(h => {
      const opt = document.createElement("option");
      opt.value = h.name;
      opt.textContent = h.name + " - " + h.city;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error("Hospitals load aagala", err);
  }
}

(function () {
  const s = document.createElement("style");
  s.textContent = `
.rc{max-width:720px;margin:28px auto;background:#fff;color:#17324a;border-radius:14px;overflow:hidden;box-shadow:0 14px 34px rgba(8,40,70,.35);font-family:"Segoe UI",Arial,sans-serif;text-align:left}
.rc-band{height:44px;background:linear-gradient(90deg,#1f9d8a,#0f3d5e);clip-path:polygon(0 0,100% 0,100% 35%,62% 35%,46% 100%,0 100%)}
.rc-date{text-align:right;padding:10px 24px 0;font-size:13px;color:#4a6a85}
.rc-photo{margin:12px 24px 0;height:150px;border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;background:linear-gradient(120deg,rgba(15,61,94,.55),rgba(31,157,138,.55)),url("images/hospital.jpg") center/cover,linear-gradient(120deg,#0f3d5e,#1f9d8a)}
.rc-photo b{display:block;font-size:26px;letter-spacing:1px}
.rc-photo span{font-size:13px;opacity:.9}
.rc h2{text-align:center;color:#0f3d5e;margin:18px 0 6px;font-size:24px}
.rc-intro{padding:0 28px;text-align:center;font-size:14px;color:#4a6a85}
.rc-sec{padding:14px 28px 0}
.rc-sec h4{margin:10px 0 6px;color:#0f3d5e;font-size:16px;border-bottom:2px solid #1f9d8a;padding-bottom:4px}
.rc-row{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid #e6eef2;font-size:14px}
.rc-row span{flex:0 0 38%;color:#5b7488}
.rc-row b{flex:1;color:#17324a;font-weight:600}
.rc-chip{display:inline-block;background:#0f3d5e;color:#fff;padding:6px 14px;border-radius:6px;font-size:13px}
.rc-foot{display:flex;align-items:center;gap:16px;padding:18px 28px 6px}
#qrbox{padding:6px;border:1px solid #d5e3ea;border-radius:8px;line-height:0;min-width:92px;min-height:92px}
.rc-foot p{margin:0;font-size:13px;color:#4a6a85}
.rc-msg{margin:10px 28px;padding:10px 14px;background:#eef8f6;border-left:4px solid #1f9d8a;border-radius:6px;font-size:13px;color:#17324a}
.rc-actions{display:flex;gap:10px;padding:6px 28px 20px}
.rc-actions a,.rc-actions button{flex:1;text-align:center;padding:11px;border:0;border-radius:25px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none}
.rc-wa{background:#25d366;color:#fff}
.rc-print{background:#0f3d5e;color:#fff}
.rc-bottom{height:30px;background:linear-gradient(90deg,#0f3d5e,#1f9d8a);clip-path:polygon(35% 100%,100% 100%,100% 0,55% 0)}
@media print{
  body *{visibility:hidden}
  #receipt,#receipt *{visibility:visible}
  #receipt{position:absolute;top:0;left:50%;transform:translateX(-50%);width:720px;max-width:100%;margin:0;box-shadow:none}
  .rc-actions{display:none}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}`;
  document.head.appendChild(s);
})();

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const name = document.getElementById("patientName").value;
  const mobile = document.getElementById("mobile").value;
  const type = document.getElementById("bookingType").value;
  const h = document.getElementById("hospital");
  const hospital = h.value;

  const info = (window.hospitalsData || []).find(x => x.name === hospital) || {};
  const parts = [info.address, info.city, info.district, info.pincode].filter(Boolean);
  const address = [...new Set(parts)].join(", ") || "Address will be updated soon";

  const d = document.getElementById("apptDate").value.split("-");
  const dt = new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]));
  const dateFull = days[dt.getDay()] + ", " + months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

  const now = new Date();
  const today = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

  const t = document.getElementById("apptTime").value.split(":");
  const hr = Number(t[0]);
  const time = ((hr % 12) || 12) + ":" + t[1] + " " + (hr >= 12 ? "PM" : "AM");

  const id = "CC" + Math.floor(100000 + Math.random() * 900000);
  const masked = mobile.slice(0, 2) + "xxxxxx" + mobile.slice(-2);

  const msg = "CareCoimbatore - Appointment Confirmation\nBooking ID: " + id +
    "\nPatient: " + name + "\nType: " + type + "\nHospital: " + hospital +
    "\nAddress: " + address + "\nDate: " + dateFull + "\nTime: " + time;
  const wa = "https://wa.me/91" + mobile + "?text=" + encodeURIComponent(msg);

  document.getElementById("bookingResult").textContent = "";

  const r = document.getElementById("receipt");
  r.className = "rc";
  r.style.display = "block";
  r.innerHTML = `
    <div class="rc-band"></div>
    <div class="rc-date">${today}</div>
    <div class="rc-photo"><div><b>CareCoimbatore</b><span>Your care, confirmed</span></div></div>
    <h2>Appointment Confirmation</h2>
    <p class="rc-intro">Thank you for booking! Your appointment request has been received. Please show this page at the hospital reception.</p>

    <div class="rc-sec">
      <h4>Patient Information</h4>
      <div class="rc-row"><span>Patient Name</span><b>${esc(name)}</b></div>
      <div class="rc-row"><span>Mobile Number</span><b>${esc(mobile)}</b></div>
    </div>

    <div class="rc-sec">
      <h4>Appointment Details</h4>
      <div class="rc-row"><span>Booking ID</span><b>${id}</b></div>
      <div class="rc-row"><span>Type of Booking</span><b><span class="rc-chip">${esc(type)}</span></b></div>
      <div class="rc-row"><span>Date</span><b>${dateFull}</b></div>
      <div class="rc-row"><span>Time</span><b>${time}</b></div>
    </div>

    <div class="rc-sec">
      <h4>Hospital Details</h4>
      <div class="rc-row"><span>Hospital</span><b>${esc(hospital)}</b></div>
      <div class="rc-row"><span>Address</span><b>${esc(address)}</b></div>
    </div>

    <div class="rc-foot">
      <div id="qrbox"></div>
      <p>Scan this QR code at the hospital reception.</p>
    </div>
    <div class="rc-msg">📩 Tap "Send on WhatsApp" to send this confirmation to +91 ${masked}</div>
    <div class="rc-actions">
      <a class="rc-wa" href="${wa}" target="_blank">Send on WhatsApp</a>
      <button type="button" class="rc-print" onclick="window.print()">Print</button>
    </div>
    <div class="rc-bottom"></div>`;

  if (typeof QRCode !== "undefined") {
    new QRCode(document.getElementById("qrbox"), {
      text: id + " | " + name + " | " + dateFull + " " + time,
      width: 80, height: 80
    });
  }
  r.scrollIntoView({ behavior: "smooth" });
});