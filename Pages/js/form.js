document.getElementById('newProjectBtn').addEventListener('click', () => {
  const popupWindow = window.open('', 'NewProjectWindow', 'width=540,height=680,scrollbars=yes');

  const popupContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Add Project</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #0f172a;
          color: #cbd5e1;
          padding: 24px;
          margin: 0;
        }
        .header { margin-bottom: 20px; }
        .header h3 { margin: 0; font-size: 18px; font-weight: 600; color: #f8fafc; }
        .header p { margin: 4px 0 0 0; font-size: 13px; color: #64748b; }
        .form-group { margin-bottom: 14px; }
        label {
          display: block; font-size: 12px; font-weight: 500; margin-bottom: 5px;
          color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;
        }
        input, select {
          width: 100%; padding: 9px 11px; border-radius: 6px; border: 1px solid #1e293b;
          background-color: #162032; color: #e2e8f0; box-sizing: border-box;
          font-size: 13.5px; transition: border-color 0.15s ease;
        }
        input::placeholder { color: #475569; }
        input:focus, select:focus { outline: none; border-color: #38bdf8; background-color: #1a263d; }
        .form-row { display: flex; gap: 12px; }
        .form-row .form-group { flex: 1; }
        .read-only-input { background-color: #0f172a; color: #64748b; border-color: #1e293b; }
        .actions {
          display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px;
          padding-top: 16px; border-top: 1px solid #1e293b;
        }
        .btn-cancel {
          background: none; border: 1px solid #334155; color: #94a3b8;
          padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer;
        }
        .btn-cancel:hover { background-color: #1e293b; color: #e2e8f0; }
        .btn-save {
          background-color: #0284c7; border: none; color: #ffffff;
          padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background-color 0.15s ease;
        }
        .btn-save:hover { background-color: #0369a1; }
      </style>
    </head>
    <body>

      <div class="header">
        <h3>Add New Project</h3>
        <p>Enter utility construction details for grid overlap analysis.</p>
      </div>

      <form id="projectForm">
        <div class="form-group">
          <label for="companyName">Company Name</label>
          <input type="text" id="companyName" placeholder="e.g., Florida Power & Light" required>
        </div>

        <div class="form-group">
          <label for="projectName">Project Name</label>
          <input type="text" id="projectName" placeholder="e.g., Substation Alpha Upgrade" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="projectType">Type</label>
            <select id="projectType" required>
              <option value="">Select Type</option>
              <option value="Substation Upgrade">Substation Upgrade</option>
              <option value="Transmission Line Extension">Transmission Line</option>
              <option value="Grid Hardening">Grid Hardening</option>
              <option value="Solar Interconnection">Solar Tie-In</option>
            </select>
          </div>

          <div class="form-group">
            <label for="state">State</label>
            <select id="state" required>
              <option value="">Select State</option>
              <option value="FL">Florida (FL)</option>
              <option value="GA">Georgia (GA)</option>
              <option value="AL">Alabama (AL)</option>
              <option value="NC">North Carolina (NC)</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input type="date" id="startDate" required>
          </div>

          <div class="form-group">
            <label for="endDate">End Date</label>
            <input type="date" id="endDate" required>
          </div>
        </div>

        <div class="form-group">
          <label for="duration">Calculated Duration</label>
          <input type="text" id="duration" class="read-only-input" placeholder="Select dates above..." readonly>
        </div>

        <div class="actions">
          <button type="button" class="btn-cancel" onclick="window.close()">Cancel</button>
          <button type="submit" class="btn-save">Save Project</button>
        </div>
      </form>

      <script>
        const startInput = document.getElementById('startDate');
        const endInput = document.getElementById('endDate');
        const durationInput = document.getElementById('duration');

        function calculateDuration() {
          if (startInput.value && endInput.value) {
            const start = new Date(startInput.value);
            const end = new Date(endInput.value);
            if (end > start) {
              const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
              durationInput.value = months + (months === 1 ? ' Month' : ' Months');
            } else {
              durationInput.value = 'Invalid Date Window';
            }
          }
        }

        startInput.addEventListener('change', calculateDuration);
        endInput.addEventListener('change', calculateDuration);

        document.getElementById('projectForm').addEventListener('submit', (e) => {
          e.preventDefault();
          window.close();
        });
      <\/script>

    </body>
    </html>
  `;

  popupWindow.document.open();
  popupWindow.document.write(popupContent);
  popupWindow.document.close();
});