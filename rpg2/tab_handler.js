 function openTab(evt, tabName) {
      // Hide all tab content
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      // Show selected tab
      document.getElementById(tabName).classList.add('active');
  }

 tabbing = true