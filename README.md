# Notion-like Editor

A modern, feature-rich text editor inspired by Notion's block-based editing experience. Built with vanilla JavaScript, HTML, and CSS for a lightweight, fast, and responsive editing experience.

## ✨ Features

### 🎯 Core Functionality
- **Block-based editing** - Each piece of content is a separate block
- **Real-time editing** - Instant updates as you type
- **Auto-save** - Content is automatically saved to local storage
- **Multiple pages** - Create and switch between different pages
- **Rich text formatting** - Bold, italic, underline, and more

### 📝 Block Types
- **Headings** (H1, H2, H3) - For document structure
- **Paragraphs** - Regular text blocks
- **Bullet Lists** - Unordered lists with bullet points
- **Numbered Lists** - Ordered lists with automatic numbering
- **Quotes** - Styled quote blocks with left border
- **Code Blocks** - Monospace font with background highlighting

### 🎨 User Interface
- **Modern sidebar** - Page navigation and quick actions
- **Floating toolbar** - Formatting options always accessible
- **Block menu** - Type `/` to access block type options
- **Responsive design** - Works on desktop, tablet, and mobile
- **Clean typography** - Inter font family for optimal readability

### ⌨️ Keyboard Shortcuts
- `Enter` - Create new block
- `Backspace` (on empty block) - Delete block and merge with previous
- `Tab` - Indent block
- `Shift + Tab` - Outdent block
- `/` - Open block type menu
- `Ctrl/Cmd + B` - Bold text
- `Ctrl/Cmd + I` - Italic text
- `Ctrl/Cmd + U` - Underline text
- `Ctrl/Cmd + S` - Save content
- `Escape` - Close block menu

### 💾 Data Management
- **Local storage** - Content persists between sessions
- **Export functionality** - Download content as HTML
- **Page management** - Create, switch, and organize pages
- **Auto-backup** - Automatic saving prevents data loss

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start editing immediately!

### File Structure
```
notion-editor/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Core functionality and interactions
└── README.md           # This documentation
```

## 📖 Usage Guide

### Basic Editing
1. **Start typing** - Click anywhere in the editor and begin typing
2. **Create new blocks** - Press `Enter` to create a new block below
3. **Delete blocks** - Press `Backspace` on an empty block to delete it
4. **Format text** - Use the toolbar buttons or keyboard shortcuts

### Block Types
1. **Type `/`** on an empty block to open the block menu
2. **Select a block type** from the menu (Heading, List, Quote, etc.)
3. **Or use toolbar buttons** to change the current block type

### Page Management
1. **Switch pages** - Click on page names in the sidebar
2. **Create new page** - Click "New Page" button in the sidebar
3. **Content is saved** automatically when switching pages

### Text Formatting
- **Bold**: `Ctrl/Cmd + B` or toolbar button
- **Italic**: `Ctrl/Cmd + I` or toolbar button
- **Underline**: `Ctrl/Cmd + U` or toolbar button
- **Select text** and use toolbar buttons for formatting

## 🛠️ Technical Details

### Architecture
- **Vanilla JavaScript** - No frameworks or libraries
- **ES6+ Classes** - Object-oriented design
- **Event-driven** - Responsive to user interactions
- **Modular code** - Easy to extend and maintain

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- **Lightweight** - No external dependencies
- **Fast loading** - Minimal file sizes
- **Smooth interactions** - Optimized event handling
- **Efficient storage** - Compressed local storage usage

## 🔧 Customization

### Adding New Block Types
1. Add the block type to the HTML structure
2. Add CSS styling for the new block type
3. Update the JavaScript block menu and handling

### Styling Modifications
- Edit `styles.css` to customize colors, fonts, and layout
- Modify CSS variables for consistent theming
- Add custom animations and transitions

### Feature Extensions
- Add image upload functionality
- Implement collaborative editing
- Add markdown import/export
- Create custom block types

## 📱 Responsive Design

The editor is fully responsive and works on:
- **Desktop** - Full sidebar and toolbar
- **Tablet** - Compact sidebar, full functionality
- **Mobile** - Hidden sidebar, touch-optimized interface

## 🔒 Data Privacy

- **Local storage only** - No data sent to external servers
- **Client-side processing** - All operations happen in your browser
- **No tracking** - No analytics or user tracking
- **Export control** - You control when and how to export data

## 🤝 Contributing

Feel free to contribute to this project by:
1. Reporting bugs or issues
2. Suggesting new features
3. Submitting pull requests
4. Improving documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Notion's excellent user experience
- Built with modern web standards
- Uses Inter font family for optimal readability
- Font Awesome icons for the interface

---

**Happy editing!** 🎉