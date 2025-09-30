# AI Projects Portfolio

A modern, responsive, and multilingual portfolio website showcasing AI applications and projects. Built with vanilla HTML, CSS, and JavaScript for easy deployment on GitHub Pages.

## 🚀 Features

- **Modern Design**: Clean, minimalist interface inspired by leading AI companies
- **Responsive Layout**: Mobile-first design that works on all devices
- **Multilingual Support**: Spanish and English with easy language switching
- **Project Showcase**: Grid-based gallery with filtering capabilities
- **Smooth Animations**: Subtle animations and interactions for enhanced UX
- **Easy Updates**: JSON-based project data for simple content management
- **GitHub Pages Ready**: Optimized for deployment on GitHub Pages

## 🎨 Design Highlights

- Modern color palette and typography
- Smooth scrolling navigation
- Interactive project filtering
- Animated counters and elements
- High-quality placeholder support
- Accessibility-compliant design

## 📁 Project Structure

```
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css        # All styles and responsive design
│   ├── js/
│   │   ├── main.js           # Main JavaScript functionality
│   │   └── i18n.js           # Multilingual support system
│   ├── images/
│   │   └── projects/         # Project images directory
│   └── data/
│       └── projects.json     # Project data (easy to update)
├── README.md                 # This file
└── .gitignore               # Git ignore file
```

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **JSON**: Data storage for projects
- **GitHub Pages**: Hosting platform

## 📦 Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-portfolio.git
   cd ai-portfolio
   ```

2. **Open in browser:**
   - Simply open `index.html` in your preferred browser
   - Or use a local server for better development experience:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (if you have http-server installed)
     npx http-server

     # Using PHP
     php -S localhost:8000
     ```

3. **View the site:**
   - Navigate to `http://localhost:8000` in your browser

### Deployment on GitHub Pages

1. **Create a new repository** on GitHub (or use existing one)

2. **Upload your files** to the repository

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/repository-name/`
   - It may take a few minutes to deploy

## ✏️ Customization

### Adding New Projects

1. **Add project images** to `assets/images/projects/`

2. **Update project data** in `assets/data/projects.json`:
   ```json
   {
     "id": 13,
     "title": "Your New Project",
     "description": "Project description here...",
     "image": "assets/images/projects/your-image.jpg",
     "technologies": ["Tech1", "Tech2", "Tech3"],
     "category": "machine-learning",
     "status": "completed",
     "github": "https://github.com/yourusername/your-project",
     "demo": "https://your-demo-link.com",
     "featured": false,
     "dateCreated": "2024-03-25",
     "lastUpdated": "2024-03-25"
   }
   ```

3. **Categories available:**
   - `machine-learning`
   - `nlp` (Natural Language Processing)
   - `computer-vision`
   - `web-app`

4. **Status options:**
   - `completed`
   - `in-progress`
   - `archived`

### Personalizing Content

1. **Update personal information** in `index.html`:
   - Change the meta tags (title, description, author)
   - Update contact links (email, GitHub, LinkedIn)
   - Modify the hero section content

2. **Update translations** in `assets/js/i18n.js`:
   - Add or modify text in both English and Spanish
   - Follow the existing nested object structure

3. **Customize styling** in `assets/css/styles.css`:
   - Modify CSS custom properties (variables) at the top
   - Adjust colors, fonts, spacing as needed

### Adding Languages

To add a new language (e.g., French):

1. **Add translation data** in `assets/js/i18n.js`:
   ```javascript
   fr: {
     nav: {
       logo: "Portfolio IA",
       home: "Accueil",
       // ... more translations
     }
     // ... complete translation object
   }
   ```

2. **Add language button** in `index.html`:
   ```html
   <button class="lang-btn" data-lang="fr">FR</button>
   ```

3. **Update language detection** in `i18n.js`:
   ```javascript
   return ['en', 'es', 'fr'].includes(langCode) ? langCode : 'en';
   ```

## 🎯 Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid system
- Touch-friendly navigation

### Performance Optimization
- Lazy loading images
- Efficient CSS with custom properties
- Minimal JavaScript dependencies
- Optimized animations

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Screen reader compatibility

### SEO Ready
- Meta tags for search engines
- Open Graph tags for social media
- Structured data markup
- Fast loading times

## 🔧 Troubleshooting

### Images Not Loading
- Ensure image paths are correct in `projects.json`
- Check that images exist in `assets/images/projects/`
- Use placeholder URLs if images are not available yet

### Projects Not Displaying
- Verify `projects.json` format is valid JSON
- Check browser console for JavaScript errors
- Ensure the projects array is properly formatted

### GitHub Pages Issues
- Make sure the repository is public (for free accounts)
- Verify GitHub Pages is enabled in repository settings
- Check that `index.html` is in the root directory
- Allow time for deployment (can take up to 10 minutes)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📞 Support

If you have questions or need help with customization:

- Create an issue in this repository
- Check the troubleshooting section above
- Review the code comments for guidance

## 🌟 Showcase

This portfolio template has been designed to be:
- **Professional**: Clean, modern design suitable for showcasing technical work
- **Flexible**: Easy to customize and extend for different types of projects
- **Accessible**: Works for all users across different devices and abilities
- **Maintainable**: Clear structure and documentation for easy updates

---

**Ready to showcase your AI projects?** 🚀

Remember to replace placeholder content with your actual project information and personalize the styling to match your preferences!