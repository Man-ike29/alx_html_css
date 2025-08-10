# Headphones Website

A modern, responsive headphones website built from scratch using HTML and CSS, designed by Nicolas Philippot (UI/UX designer).

## 🎯 Project Overview

This project is a fully functional, responsive web page that showcases a headphones brand. The website features a clean, modern design with a dark theme and professional typography, optimized for both desktop and mobile devices.

## ✨ Features

- **Responsive Design**: Seamlessly adapts to different screen sizes
- **Mobile-First Approach**: Optimized for mobile devices (480px breakpoint)
- **Interactive Elements**: Hover and active states for enhanced user experience
- **Accessibility**: Semantic HTML structure and focus states for keyboard navigation
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern layout techniques
- **No External Dependencies**: Built entirely with vanilla HTML and CSS

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with advanced features
  - CSS Grid for layout
  - Flexbox for alignment
  - CSS Custom Properties (variables)
  - Media queries for responsiveness
  - Transitions and hover effects

## 📱 Responsive Breakpoints

- **Desktop**: 1000px and above (max-width container)
- **Tablet**: 768px and below
- **Mobile**: 480px and below

## 🎨 Design Specifications

### Colors
- **Primary Background**: `#071629` (Dark blue)
- **Secondary Background**: `#ffffff` (White)
- **Accent Color**: `#FF6565` (Red/Pink)
- **Text Color**: `#ffffff` (White on dark), `#071629` (Dark on light)

### Typography
- **Font Family**: Source Sans Pro (with Arial fallback)
- **Font Weights**: 400 (regular), 600 (semi-bold), 700 (bold)

### Interactive States
- **Links Hover/Active**: `#FF6565`
- **Button Hover/Active**: `opacity: 0.9`

## 📁 Project Structure

```
headphones/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── logo.svg           # Logo file
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alx_html_css.git
   ```

2. Navigate to the project directory:
   ```bash
   cd alx_html_css
   ```

3. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server for development

### Development Server (Optional)
For development purposes, you can use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📋 Features Implemented

### Header Section
- Logo with SVG format for crisp display
- Navigation menu with hover effects
- Responsive hamburger menu for mobile devices

### Hero Section
- Compelling headline and call-to-action
- Gradient background for visual appeal
- Centered content with proper spacing

### Services Section
- Grid layout showcasing four services
- Custom SVG icons with brand colors
- Responsive grid that adapts to screen size

### Mobile Optimization
- Navigation transforms to hamburger menu
- Single-column layout for services on mobile
- Optimized typography and spacing
- Touch-friendly button sizes

## 🔧 Customization

### Changing Colors
Update the color values in `styles.css`:
```css
/* Primary colors */
background-color: #071629;  /* Dark background */
color: #FF6565;            /* Accent color */
```

### Modifying Typography
Update font properties:
```css
font-family: 'Your-Font', Arial, sans-serif;
font-size: 16px;
font-weight: 400;
```

### Adding New Sections
Follow the existing HTML structure and CSS patterns:
```html
<section class="new-section">
    <div class="container">
        <!-- Your content here -->
    </div>
</section>
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with some limitations)

## 📊 Performance

- **Lightweight**: No external libraries or frameworks
- **Fast Loading**: Optimized CSS and minimal HTTP requests
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: WCAG compliant markup and interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Design by Nicolas Philippot (UI/UX Designer)
- Inspiration from modern web design trends
- ALX Software Engineering Program

## 📞 Support

If you have any questions or need help with the project, please:
1. Check the existing issues on GitHub
2. Create a new issue if your problem isn't already addressed
3. Provide detailed information about your environment and the issue

---

**Made with ❤️ for the ALX Software Engineering Program**