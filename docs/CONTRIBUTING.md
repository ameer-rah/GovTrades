# Contributing to GovTrades

We welcome contributions to the GovTrades project! This document provides guidelines for contributing to this government transparency platform.

## 🎯 Mission

GovTrades promotes transparency in government by making financial disclosure data accessible to all citizens. Every contribution should align with this mission of openness, accuracy, and public service.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm 8.0 or higher
- Git

### Local Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/govtrades.git
   cd govtrades
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📋 Types of Contributions

### 🐛 Bug Reports
- Use the GitHub issue template
- Include steps to reproduce
- Provide browser/OS information
- Add screenshots if applicable

### ✨ Feature Requests
- Describe the problem you're solving
- Explain why this feature benefits users
- Consider implementation complexity
- Check existing issues first

### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Documentation updates
- Test coverage improvements

### 📊 Data Contributions
- Data accuracy improvements
- New data sources
- Data validation enhancements
- Historical data additions

## 🛠 Development Guidelines

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### Component Structure

Follow this structure for React components:

```javascript
import React, { useState, useEffect } from 'react';
import { IconName } from 'lucide-react';
import { helperFunction } from '../utils/helpers';

const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleEvent = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use the design system colors and components

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Follow conventional commit format: `type(scope): description`
   - Examples:
     - `feat(search): add autocomplete functionality`
     - `fix(profile): resolve trading volume calculation`
     - `docs(api): update endpoint documentation`

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Submit a pull request**
   - Use the pull request template
   - Reference related issues
   - Include screenshots for UI changes
   - Request review from maintainers

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update existing tests when modifying functionality
- Aim for meaningful test descriptions
- Test both happy path and edge cases

Example test structure:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    render(<ComponentName />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

## 📊 Data Standards

### Data Accuracy
- Verify all financial data against official sources
- Include source attribution
- Update outdated information promptly
- Flag potential discrepancies

### Data Sources Priority
1. Official government disclosures
2. SEC filings
3. Verified financial reports
4. Reputable news sources with fact-checking

### Data Validation
- Implement data validation checks
- Cross-reference multiple sources
- Flag unusual trading patterns
- Maintain audit trails

## 🔒 Security Guidelines

### Data Handling
- Never commit sensitive data
- Use environment variables for API keys
- Sanitize user inputs
- Follow OWASP security guidelines

### Privacy Considerations
- Only display publicly available information
- Respect official disclosure requirements
- Implement appropriate data retention policies
- Consider user privacy in analytics

## 📝 Documentation

### Code Documentation
- Write clear, self-documenting code
- Add JSDoc comments for complex functions
- Update README for new features
- Maintain API documentation

### User Documentation
- Update user guides for new features
- Include screenshots and examples
- Write clear, jargon-free explanations
- Consider different user skill levels

## 🚀 Deployment

### Staging Environment
- Test all changes in staging first
- Verify cross-browser compatibility
- Check mobile responsiveness
- Validate performance metrics

### Production Deployment
- Requires maintainer approval
- Automated testing must pass
- Performance budget requirements
- Security scan completion

## 📞 Getting Help

### Community Resources
- GitHub Discussions for questions
- Discord server for real-time chat
- Weekly office hours (Fridays 2-3 PM EST)
- Documentation wiki

### Reporting Issues
- Security issues: security@govtrades.com
- Data accuracy: data@govtrades.com
- General issues: GitHub Issues
- Feature requests: GitHub Discussions

## 🏆 Recognition

We recognize contributors through:
- GitHub contributor badges
- Monthly contributor highlights
- Annual contributor awards
- Conference speaking opportunities

## 📄 Legal

### Contributor License Agreement
By contributing, you agree that:
- Your contributions are your original work
- You grant us license to use your contributions
- Your contributions don't violate any third-party rights
- You comply with our Code of Conduct

### Code of Conduct
We are committed to providing a welcoming and inclusive environment:
- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Show empathy towards other contributors

## 🔄 Review Process

### Pull Request Reviews
- All PRs require at least one approval
- Maintainers will review within 48 hours
- Address feedback promptly
- Keep PRs focused and reasonably sized

### Quality Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage maintained
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Accessibility standards met

Thank you for contributing to government transparency! 🇺🇸