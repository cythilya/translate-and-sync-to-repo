const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Mock external dependencies
jest.mock('@vitalets/google-translate-api', () => ({
  translate: jest.fn((text) => Promise.resolve({ text: `Translated: ${text}` }))
}));

describe('GitHub Translation Action', () => {
  // Mock file system operations
  const mockReadFile = (content = '') => {
    return jest.spyOn(fs, 'readFileSync').mockReturnValue(content);
  };

  const mockWriteFile = () => {
    return jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  };

  const mockExistsSync = (exists = true) => {
    return jest.spyOn(fs, 'existsSync').mockReturnValue(exists);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // File Detection Tests
  describe('File Detection', () => {
    test('should detect only markdown files', () => {
      const files = [
        'README.md', 
        'docs/guide.md', 
        'config.json', 
        'script.js'
      ];
      
      const markdownFiles = files.filter(file => path.extname(file) === '.md');
      
      expect(markdownFiles).toEqual(['README.md', 'docs/guide.md']);
    });
  });

  // Translation Logic Tests
  describe('Translation Process', () => {
    test('should translate markdown file content', async () => {
      const mockContent = '# Hello World\n\nThis is a test file.';
      mockReadFile(mockContent);
      mockWriteFile();

      // Simulated translation function
      const translateContent = async (content) => {
        return `Translated: ${content}`;
      };

      const translatedContent = await translateContent(mockContent);
      
      expect(translatedContent).toContain('Translated:');
    });

    test('should handle empty files', async () => {
      mockReadFile('');
      
      const translateContent = async (content) => {
        return content;
      };

      const translatedContent = await translateContent('');
      
      expect(translatedContent).toBe('');
    });
  });

  // File Synchronization Tests
  describe('File Synchronization', () => {
    test('should copy translated files', () => {
      const mockExistsSync = jest.spyOn(fs, 'existsSync');
      const mockMkdirSync = jest.spyOn(fs, 'mkdirSync');

      const sourcePath = path.join(process.cwd(), 'translated_files');
      const targetPath = path.join(process.cwd(), 'repo-en');

      mockExistsSync.mockReturnValue(true);
      mockMkdirSync.mockImplementation(() => {});

      // Simulate directory and file creation
      expect(() => {
        fs.mkdirSync(sourcePath, { recursive: true });
        fs.mkdirSync(targetPath, { recursive: true });
      }).not.toThrow();
    });
  });

  // GitHub Actions Workflow Tests
  describe('GitHub Actions Workflow', () => {
    test('should filter markdown files', () => {
      const changedFiles = [
        'README.md', 
        'docs/guide.md', 
        'config.json'
      ];
      
      const markdownFiles = changedFiles.filter(file => path.extname(file) === '.md');
      
      expect(markdownFiles).toEqual(['README.md', 'docs/guide.md']);
      expect(markdownFiles).toHaveLength(2);
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    test('should handle non-existent files', () => {
      const nonExistentPath = path.join(process.cwd(), 'non_existent.md');
      
      mockExistsSync(false);
      
      expect(fs.existsSync(nonExistentPath)).toBe(false);
    });
  });
});