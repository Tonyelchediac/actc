document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  header.innerHTML = `
            <div class="logo">
                <img src="../images/logo removed-bg.png" alt="الشعار">
            </div>
            <nav>
                <ul>
                    <li class="has-submenu">
                        <a href="/ar/index.html">الرئيسية</a>
                        <div class="submenu">
                            <a href="/ar/index.html#about">من نحن</a>
                            <a href="/ar/index.html#tips">نصائح بسيطة</a>
                            <a href="/ar/index.html#services">الخدمات</a>
                            <a href="/ar/index.html#accessibility">إمكانية الوصول</a>
                        </div>
                    </li>
                    <li class="has-submenu">
                        <a href="/ar/route&lines.html">المسارات والخطوط</a>
                        <div class="submenu">
                            <a href="/ar/route&lines.html#lines">الخطوط</a>
                            <a href="/ar/route&lines.html#map">الخريطة</a>
                        </div>
                    </li>
                    <li><a href="/ar/timetable.html">جدول المواعيد</a></li>
                    <li class="has-submenu">
                        <a href="/ar/boarding-pass.html">بطاقة الصعود</a>
                        <div class="submenu">
                            <a href="/ar/boarding-pass.html#tickets">التذاكر</a>
                            <a href="/ar/boarding-pass.html#cards">البطاقات</a>
                        </div>
                    </li>
                    <li><a href="/ar/complaint.html">شكاوى</a></li>
                </ul>
            </nav>
            <div class="hamburger">
                <i class="fa-solid fa-bars"></i>
            </div>
        `;

  // Hamburger menu icon toggle
  const headerNav = document.querySelector("header nav");
  const hamburger = document.querySelector(".hamburger");
  const icon = hamburger.querySelector("i");

  hamburger.addEventListener("click", () => {
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
      headerNav.classList.add("active");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
      headerNav.classList.remove("active");
    }
  });

  // navlinks click event
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerNav.classList.remove("active");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = `
            <div class="footer-main">
                <div class="footer-logo">
                    <img src="images/logo removed-bg.png" alt="شعار النقل العام اللبناني" />
                    <span>النقل العام اللبناني</span>
                </div>
                <div class="footer-nav">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="#home">الرئيسية</a></li>
                    <li><a href="route&lines.html">المسارات والخطوط</a></li>
                    <li><a href="timetable.html">جدول المواعيد</a></li>
                    <li><a href="boarding-pass.html">بطاقة الصعود</a></li>
                    <li><a href="complaint.html">شكاوى</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>تواصل معنا</h4>
                    <p>البريد الإلكتروني: <a href="mailto:info@lebanesetransport.com">info@lebanesetransport.com</a></p>
                    <p>الهاتف: <a href="tel:+9611234567">+961 1 234 567</a></p>
                    <p>بيروت، لبنان</p>
                </div>
                <div class="footer-newsletter">
                  <h4>النشرة البريدية</h4>
                  <p>اشترك في نشرتنا البريدية للحصول على التحديثات والعروض الخاصة.</p>
                  <form action="#" method="post">
                    <input type="email" name="email" placeholder="أدخل بريدك الإلكتروني" required />
                    <button type="submit">اشترك</button>
                  </form>
                </div>
                <div class="footer-social">
                    <a href="https://www.facebook.com" target="_blank" aria-label="فيسبوك"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.twitter.com" target="_blank" aria-label="تويتر"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.instagram.com" target="_blank" aria-label="انستغرام"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 النقل العام اللبناني. جميع الحقوق محفوظة.</p>
                <p>
                    <a href="#accessibility">إمكانية الوصول</a> |
                    <a href="#">سياسة الخصوصية</a>
                </p>
            </div>
        `;
  }
});
