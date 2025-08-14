class NotionEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.blockMenu = document.getElementById('blockMenu');
        this.currentPage = 'main';
        this.pages = {
            main: [],
            notes: [],
            tasks: []
        };
        
        this.init();
    }

    init() {
        this.loadContent();
        this.setupEventListeners();
        this.setupToolbar();
        this.setupSidebar();
        this.setupBlockMenu();
    }

    setupEventListeners() {
        // Editor events
        this.editor.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.editor.addEventListener('input', this.handleInput.bind(this));
        this.editor.addEventListener('click', this.handleClick.bind(this));
        this.editor.addEventListener('paste', this.handlePaste.bind(this));

        // Global events
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('keydown', this.handleGlobalKeyDown.bind(this));
    }

    setupToolbar() {
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        toolbarButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                this.executeCommand(command);
            });
        });
    }

    setupSidebar() {
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => {
            item.addEventListener('click', () => {
                this.switchPage(item.dataset.page);
            });
        });

        const newPageBtn = document.querySelector('.new-page-btn');
        newPageBtn.addEventListener('click', () => {
            this.createNewPage();
        });
    }

    setupBlockMenu() {
        const menuItems = document.querySelectorAll('.block-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.changeBlockType(item.dataset.type);
                this.hideBlockMenu();
            });
        });
    }

    handleKeyDown(e) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const currentBlock = this.getCurrentBlock();

        // Handle Enter key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.createNewBlock();
            return;
        }

        // Handle Backspace on empty block
        if (e.key === 'Backspace' && currentBlock && this.isBlockEmpty(currentBlock)) {
            const prevBlock = currentBlock.previousElementSibling;
            if (prevBlock && prevBlock.classList.contains('block')) {
                e.preventDefault();
                this.deleteBlock(currentBlock);
                this.focusBlock(prevBlock);
                return;
            }
        }

        // Handle slash command
        if (e.key === '/' && this.isBlockEmpty(currentBlock)) {
            this.showBlockMenu(currentBlock);
            return;
        }

        // Handle Tab for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                this.outdentBlock(currentBlock);
            } else {
                this.indentBlock(currentBlock);
            }
        }

        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    this.executeCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.executeCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    this.executeCommand('underline');
                    break;
                case 's':
                    e.preventDefault();
                    this.saveContent();
                    break;
            }
        }
    }

    handleInput(e) {
        // Auto-save content
        this.debounce(() => {
            this.saveContent();
        }, 1000)();

        // Update block menu position if visible
        if (this.blockMenu.style.display !== 'none') {
            this.updateBlockMenuPosition();
        }
    }

    handleClick(e) {
        // Hide block menu when clicking in editor
        this.hideBlockMenu();
    }

    handlePaste(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    }

    handleGlobalClick(e) {
        // Hide block menu when clicking outside
        if (!this.blockMenu.contains(e.target) && !this.editor.contains(e.target)) {
            this.hideBlockMenu();
        }
    }

    handleGlobalKeyDown(e) {
        // Hide block menu on Escape
        if (e.key === 'Escape') {
            this.hideBlockMenu();
        }
    }

    getCurrentBlock() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return null;
        
        const range = selection.getRangeAt(0);
        let node = range.commonAncestorContainer;
        
        while (node && !node.classList?.contains('block')) {
            node = node.parentElement;
        }
        
        return node;
    }

    isBlockEmpty(block) {
        if (!block) return true;
        const content = block.querySelector('.block-content');
        return !content.textContent.trim();
    }

    createNewBlock() {
        const currentBlock = this.getCurrentBlock();
        const newBlock = document.createElement('div');
        newBlock.className = 'block';
        newBlock.setAttribute('data-type', 'p');
        newBlock.innerHTML = '<div class="block-content" contenteditable="true"></div>';
        
        if (currentBlock) {
            currentBlock.after(newBlock);
        } else {
            this.editor.appendChild(newBlock);
        }
        
        this.focusBlock(newBlock);
    }

    deleteBlock(block) {
        if (block && block.classList.contains('block')) {
            block.remove();
        }
    }

    focusBlock(block) {
        if (block) {
            const content = block.querySelector('.block-content');
            if (content) {
                content.focus();
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(content);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    changeBlockType(type) {
        const currentBlock = this.getCurrentBlock();
        if (currentBlock) {
            currentBlock.setAttribute('data-type', type);
            this.focusBlock(currentBlock);
        }
    }

    showBlockMenu(block) {
        this.blockMenu.style.display = 'block';
        this.updateBlockMenuPosition();
    }

    hideBlockMenu() {
        this.blockMenu.style.display = 'none';
    }

    updateBlockMenuPosition() {
        const currentBlock = this.getCurrentBlock();
        if (currentBlock) {
            const rect = currentBlock.getBoundingClientRect();
            this.blockMenu.style.left = rect.left + 'px';
            this.blockMenu.style.top = (rect.bottom + 5) + 'px';
        }
    }

    indentBlock(block) {
        // Implementation for block indentation
        console.log('Indent block');
    }

    outdentBlock(block) {
        // Implementation for block outdentation
        console.log('Outdent block');
    }

    executeCommand(command) {
        switch (command) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'underline':
                document.execCommand('underline', false, null);
                break;
            case 'h1':
            case 'h2':
            case 'h3':
                this.changeBlockType(command);
                break;
            case 'ul':
            case 'ol':
                this.changeBlockType(command);
                break;
            case 'quote':
            case 'code':
                this.changeBlockType(command);
                break;
            case 'save':
                this.saveContent();
                this.showNotification('Content saved!');
                break;
            case 'share':
                this.shareContent();
                break;
        }
    }

    switchPage(pageName) {
        // Update active page in sidebar
        document.querySelectorAll('.page-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

        // Save current content
        this.saveContent();

        // Switch to new page
        this.currentPage = pageName;
        this.loadContent();
    }

    createNewPage() {
        const pageName = prompt('Enter page name:');
        if (pageName && pageName.trim()) {
            this.pages[pageName.toLowerCase()] = [];
            this.addPageToSidebar(pageName);
            this.switchPage(pageName.toLowerCase());
        }
    }

    addPageToSidebar(pageName) {
        const pageList = document.querySelector('.page-list');
        const newPageItem = document.createElement('div');
        newPageItem.className = 'page-item';
        newPageItem.setAttribute('data-page', pageName.toLowerCase());
        newPageItem.innerHTML = `
            <i class="fas fa-file-alt"></i>
            <span>${pageName}</span>
        `;
        newPageItem.addEventListener('click', () => {
            this.switchPage(pageName.toLowerCase());
        });
        pageList.appendChild(newPageItem);
    }

    saveContent() {
        const blocks = Array.from(this.editor.querySelectorAll('.block')).map(block => ({
            type: block.getAttribute('data-type'),
            content: block.querySelector('.block-content').innerHTML
        }));
        
        this.pages[this.currentPage] = blocks;
        localStorage.setItem('notion-editor-pages', JSON.stringify(this.pages));
    }

    loadContent() {
        const savedPages = localStorage.getItem('notion-editor-pages');
        if (savedPages) {
            this.pages = JSON.parse(savedPages);
        }

        const currentBlocks = this.pages[this.currentPage] || [];
        this.editor.innerHTML = '';

        if (currentBlocks.length === 0) {
            // Create default content for new pages
            this.editor.innerHTML = `
                <div class="block" data-type="h1">
                    <div class="block-content">Welcome to ${this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1)}</div>
                </div>
                <div class="block" data-type="p">
                    <div class="block-content">Start typing to create your content...</div>
                </div>
            `;
        } else {
            // Load saved content
            currentBlocks.forEach(blockData => {
                const block = document.createElement('div');
                block.className = 'block';
                block.setAttribute('data-type', blockData.type);
                block.innerHTML = `<div class="block-content" contenteditable="true">${blockData.content}</div>`;
                this.editor.appendChild(block);
            });
        }
    }

    shareContent() {
        const content = this.editor.innerHTML;
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentPage}-content.html`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Content exported!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification fade-in';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-check-circle" style="color: #10b981; font-size: 18px;"></i>
                <span>${message}</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            color: #2d3748;
            padding: 16px 24px;
            border-radius: 16px;
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeIn 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotionEditor();
});

// Add some additional utility functions
window.NotionUtils = {
    // Export content as markdown
    exportAsMarkdown: function() {
        const blocks = Array.from(document.querySelectorAll('.block'));
        let markdown = '';
        
        blocks.forEach(block => {
            const type = block.getAttribute('data-type');
            const content = block.querySelector('.block-content').textContent;
            
            switch (type) {
                case 'h1':
                    markdown += `# ${content}\n\n`;
                    break;
                case 'h2':
                    markdown += `## ${content}\n\n`;
                    break;
                case 'h3':
                    markdown += `### ${content}\n\n`;
                    break;
                case 'ul':
                    markdown += `- ${content}\n`;
                    break;
                case 'ol':
                    markdown += `1. ${content}\n`;
                    break;
                case 'quote':
                    markdown += `> ${content}\n\n`;
                    break;
                case 'code':
                    markdown += `\`\`\`\n${content}\n\`\`\`\n\n`;
                    break;
                default:
                    markdown += `${content}\n\n`;
            }
        });
        
        return markdown;
    },

    // Import content from markdown
    importFromMarkdown: function(markdown) {
        const lines = markdown.split('\n');
        const blocks = [];
        
        lines.forEach(line => {
            if (line.startsWith('# ')) {
                blocks.push({ type: 'h1', content: line.substring(2) });
            } else if (line.startsWith('## ')) {
                blocks.push({ type: 'h2', content: line.substring(3) });
            } else if (line.startsWith('### ')) {
                blocks.push({ type: 'h3', content: line.substring(4) });
            } else if (line.startsWith('- ')) {
                blocks.push({ type: 'ul', content: line.substring(2) });
            } else if (line.startsWith('1. ')) {
                blocks.push({ type: 'ol', content: line.substring(3) });
            } else if (line.startsWith('> ')) {
                blocks.push({ type: 'quote', content: line.substring(2) });
            } else if (line.trim()) {
                blocks.push({ type: 'p', content: line });
            }
        });
        
        return blocks;
    }
};
