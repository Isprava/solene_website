import dayjs from 'dayjs';

export class DatePicker {
  constructor(inputElement) {
    this.input = inputElement;
    this.currentDate = dayjs();
    this.selectedDate = null;
    this.isOpen = false;
    this.isMonthSelectorOpen = false;
    this.isYearSelectorOpen = false;
    this.init();
  }

  init() {
    this.createDatePicker();
    this.addEventListeners();
  }

  createDatePicker() {
    this.datePickerEl = document.createElement('div');
    this.datePickerEl.className = 'date-picker';
    this.datePickerEl.innerHTML = `
      <div class="date-picker-header">
        <button class="prev-month">&lt;</button>
        <div class="date-selectors">
          <button class="month-selector"></button>
          <button class="year-selector"></button>
        </div>
        <button class="next-month">&gt;</button>
      </div>
      <div class="calendar">
        <div class="month-selector-grid" style="display: none;">
          ${this.generateMonthGrid()}
        </div>
        <div class="year-selector-grid" style="display: none;">
          ${this.generateYearGrid()}
        </div>
        <div class="date-grid">
          <div class="weekdays">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>
          <div class="days"></div>
        </div>
      </div>
    `;
    
    this.input.parentNode.appendChild(this.datePickerEl);
    this.updateCalendar();
  }

  generateMonthGrid() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `
      <div class="months">
        ${months.map((month, index) => `
          <button class="month" data-month="${index}">${month}</button>
        `).join('')}
      </div>
    `;
  }

  generateYearGrid() {
    const currentYear = this.currentDate.year();
    const startYear = currentYear - 6;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);
    
    return `
      <div class="years">
        <button class="prev-years">&lt;</button>
        <div class="year-grid">
          ${years.map(year => `
            <button class="year" data-year="${year}">${year}</button>
          `).join('')}
        </div>
        <button class="next-years">&gt;</button>
      </div>
    `;
  }

  addEventListeners() {
    this.input.addEventListener('click', () => this.toggle());
    this.input.addEventListener('focus', () => this.open());
    
    // Month/Year navigation
    this.datePickerEl.querySelector('.prev-month').addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate = this.currentDate.subtract(1, 'month');
      this.updateCalendar();
    });
    
    this.datePickerEl.querySelector('.next-month').addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate = this.currentDate.add(1, 'month');
      this.updateCalendar();
    });

    // Month selector
    this.datePickerEl.querySelector('.month-selector').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMonthSelector();
    });

    this.datePickerEl.querySelectorAll('.month').forEach(monthBtn => {
      monthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const month = parseInt(monthBtn.dataset.month);
        this.currentDate = this.currentDate.month(month);
        this.toggleMonthSelector();
        this.updateCalendar();
      });
    });

    // Year selector
    this.datePickerEl.querySelector('.year-selector').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleYearSelector();
    });

    this.datePickerEl.querySelectorAll('.year').forEach(yearBtn => {
      yearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const year = parseInt(yearBtn.dataset.year);
        this.currentDate = this.currentDate.year(year);
        this.toggleYearSelector();
        this.updateCalendar();
      });
    });

    // Year navigation
    this.datePickerEl.querySelector('.prev-years')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.updateYearGrid(-12);
    });

    this.datePickerEl.querySelector('.next-years')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.updateYearGrid(12);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.datePickerEl.contains(e.target) && e.target !== this.input) {
        this.close();
      }
    });
  }

  toggleMonthSelector() {
    const monthSelector = this.datePickerEl.querySelector('.month-selector-grid');
    const dateGrid = this.datePickerEl.querySelector('.date-grid');
    const yearSelector = this.datePickerEl.querySelector('.year-selector-grid');

    this.isMonthSelectorOpen = !this.isMonthSelectorOpen;
    this.isYearSelectorOpen = false;

    monthSelector.style.display = this.isMonthSelectorOpen ? 'block' : 'none';
    dateGrid.style.display = this.isMonthSelectorOpen ? 'none' : 'block';
    yearSelector.style.display = 'none';
  }

  toggleYearSelector() {
    const yearSelector = this.datePickerEl.querySelector('.year-selector-grid');
    const dateGrid = this.datePickerEl.querySelector('.date-grid');
    const monthSelector = this.datePickerEl.querySelector('.month-selector-grid');

    this.isYearSelectorOpen = !this.isYearSelectorOpen;
    this.isMonthSelectorOpen = false;

    yearSelector.style.display = this.isYearSelectorOpen ? 'block' : 'none';
    dateGrid.style.display = this.isYearSelectorOpen ? 'none' : 'block';
    monthSelector.style.display = 'none';

    if (this.isYearSelectorOpen) {
      this.updateYearGrid(0);
    }
  }

  updateYearGrid(offset = 0) {
    const yearGrid = this.datePickerEl.querySelector('.year-grid');
    if (!yearGrid) return;

    const currentYear = this.currentDate.year();
    const startYear = currentYear - 6 + offset;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    yearGrid.innerHTML = years.map(year => `
      <button class="year ${year === currentYear ? 'selected' : ''}" data-year="${year}">${year}</button>
    `).join('');

    // Reattach event listeners
    yearGrid.querySelectorAll('.year').forEach(yearBtn => {
      yearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const year = parseInt(yearBtn.dataset.year);
        this.currentDate = this.currentDate.year(year);
        this.toggleYearSelector();
        this.updateCalendar();
      });
    });
  }

  updateCalendar() {
    const monthStart = this.currentDate.startOf('month');
    const monthEnd = this.currentDate.endOf('month');
    const startDate = monthStart.startOf('week');
    const endDate = monthEnd.endOf('week');

    // Update month and year buttons
    this.datePickerEl.querySelector('.month-selector').textContent = 
      this.currentDate.format('MMMM');
    this.datePickerEl.querySelector('.year-selector').textContent = 
      this.currentDate.format('YYYY');

    // Update days
    const daysContainer = this.datePickerEl.querySelector('.days');
    daysContainer.innerHTML = '';

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      const dayEl = document.createElement('button');
      dayEl.className = 'day';
      dayEl.textContent = currentDate.date();

      if (currentDate.month() !== this.currentDate.month()) {
        dayEl.classList.add('other-month');
      }

      if (this.selectedDate && currentDate.isSame(this.selectedDate, 'day')) {
        dayEl.classList.add('selected');
      }

      dayEl.addEventListener('click', () => this.selectDate(currentDate));
      daysContainer.appendChild(dayEl);
      currentDate = currentDate.add(1, 'day');
    }

    // Update month selector
    this.datePickerEl.querySelectorAll('.month').forEach(monthBtn => {
      const month = parseInt(monthBtn.dataset.month);
      if (month === this.currentDate.month()) {
        monthBtn.classList.add('selected');
      } else {
        monthBtn.classList.remove('selected');
      }
    });
  }

  selectDate(date) {
    this.selectedDate = date;
    this.input.value = date.format('DD/MM/YYYY');
    this.updateCalendar();
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (!this.isOpen) {
      this.datePickerEl.style.display = 'block';
      this.isOpen = true;
    }
  }

  close() {
    if (this.isOpen) {
      this.datePickerEl.style.display = 'none';
      this.isOpen = false;
      this.isMonthSelectorOpen = false;
      this.isYearSelectorOpen = false;
      
      // Reset views
      this.datePickerEl.querySelector('.month-selector-grid').style.display = 'none';
      this.datePickerEl.querySelector('.year-selector-grid').style.display = 'none';
      this.datePickerEl.querySelector('.date-grid').style.display = 'block';
    }
  }
}