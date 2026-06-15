/**
 * Certificate PDF generation for Day 30, 60, 100 milestones
 * Requires jsPDF (loaded via CDN in index.html)
 */
const Certificates = (() => {
  const MILESTONES = {
    day_30: { days: 30, title: 'Month One Champion', subtitle: 'Completed 30 Days of Spoken English' },
    day_60: { days: 60, title: 'Month Two Achiever', subtitle: 'Completed 60 Days of Spoken English' },
    day_100: { days: 100, title: 'English Graduate', subtitle: 'Completed 100 Days — Full Program' }
  };

  function verificationCode(user, type) {
    const id = user?.uid || user?.name || 'guest';
    const hash = (id + type + (user?.xp || 0)).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return 'EI100D-' + type.toUpperCase().replace('DAY_', 'D') + '-' + hash.toString(36).toUpperCase().slice(0, 6);
  }

  function generate(type, userName, user) {
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
      alert('PDF library loading... please try again in a moment.');
      return;
    }
    const { jsPDF } = window.jspdf || jspdf;
    const meta = MILESTONES[type];
    if (!meta) return;

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    const code = verificationCode(user, type);
    const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    // Background
    doc.setFillColor(239, 246, 255);
    doc.rect(0, 0, w, h, 'F');
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(2);
    doc.rect(10, 10, w - 20, h - 20);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, w - 28, h - 28);

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text('ENGLISH IN 100 DAYS', w / 2, 32, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('Learn Spoken English for Indians', w / 2, 40, { align: 'center' });

    // Title
    doc.setFontSize(36);
    doc.setTextColor(30, 41, 59);
    doc.text('Certificate of Achievement', w / 2, 62, { align: 'center' });

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.text('This is proudly presented to', w / 2, 82, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(37, 99, 235);
    doc.text(userName || 'Learner', w / 2, 98, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.text('for successfully completing', w / 2, 114, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 41, 59);
    doc.text(meta.days + ' Days of English Learning', w / 2, 128, { align: 'center' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text(meta.subtitle, w / 2, 140, { align: 'center' });

    // Badge
    doc.setFillColor(245, 158, 11);
    doc.circle(w / 2, 158, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(meta.days + '', w / 2, 161, { align: 'center' });

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('Date: ' + date, 24, h - 28);
    doc.text('Verification: ' + code, w - 24, h - 28, { align: 'right' });
    doc.setFontSize(9);
    doc.text('englishin100days.in  •  Listen → Speak → Understand → Grammar', w / 2, h - 18, { align: 'center' });

    doc.save('English-100-Days-' + meta.days + '-Days-' + (userName || 'Certificate').replace(/\s+/g, '-') + '.pdf');
    return code;
  }

  function checkMilestone(completedDay) {
    if (completedDay === 30) return 'day_30';
    if (completedDay === 60) return 'day_60';
    if (completedDay === 100) return 'day_100';
    return null;
  }

  function renderDashboardCard(user) {
    const certs = user?.certificates || [];
    const available = Object.keys(MILESTONES).filter(k => certs.includes(k));
    if (!available.length) return '';

    return `
      <div class="bg-white border rounded-2xl p-6 mb-6">
        <h3 class="font-semibold mb-3">🏆 Your Certificates</h3>
        <div class="flex flex-wrap gap-2">
          ${available.map(type => {
            const m = MILESTONES[type];
            return `<button onclick="Certificates.download('${type}')" class="bg-accent-50 border border-accent-200 text-accent-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent-100">${m.days}-Day Certificate</button>`;
          }).join('')}
        </div>
      </div>`;
  }

  function download(type) {
    if (!window.user) return;
    const name = window.user.name || 'Learner';
    if (!isPremiumUser?.() && type !== 'day_30') {
      if (confirm('60 & 100-day certificates are Premium features. Upgrade now?')) {
        showPremium?.();
      }
      return;
    }
    generate(type, name, window.user);
  }

  return { generate, checkMilestone, renderDashboardCard, download, MILESTONES };
})();

if (typeof window !== 'undefined') window.Certificates = Certificates;
