# RTL-Aware Tailwind Classes Reference

## Overview
This document provides a reference for RTL-aware Tailwind CSS classes used in the branches page redesign. These classes automatically adjust based on the `dir` attribute set on the HTML element.

## Margin Classes

### Horizontal Margins

| Old Class (Directional) | New Class (Logical) | LTR Behavior | RTL Behavior |
|------------------------|---------------------|--------------|--------------|
| `mr-2` | `me-2` | margin-right: 0.5rem | margin-left: 0.5rem |
| `ml-2` | `ms-2` | margin-left: 0.5rem | margin-right: 0.5rem |
| `mr-4` | `me-4` | margin-right: 1rem | margin-left: 1rem |
| `ml-4` | `ms-4` | margin-left: 1rem | margin-right: 1rem |

### Usage in Project
```tsx
// ✅ CORRECT - RTL-aware
<Phone className="w-4 h-4 text-primary me-2" />

// ❌ INCORRECT - Not RTL-aware
<Phone className="w-4 h-4 text-primary mr-2" />
```

## Padding Classes

### Horizontal Padding

| Old Class (Directional) | New Class (Logical) | LTR Behavior | RTL Behavior |
|------------------------|---------------------|--------------|--------------|
| `pr-2` | `pe-2` | padding-right: 0.5rem | padding-left: 0.5rem |
| `pl-2` | `ps-2` | padding-left: 0.5rem | padding-right: 0.5rem |
| `pr-4` | `pe-4` | padding-right: 1rem | padding-left: 1rem |
| `pl-4` | `ps-4` | padding-left: 1rem | padding-right: 1rem |

### Usage in Project
```tsx
// ✅ CORRECT - RTL-aware
<div className="overflow-y-auto pe-2 custom-scrollbar">

// ❌ INCORRECT - Not RTL-aware
<div className="overflow-y-auto pr-2 custom-scrollbar">
```

## Positioning Classes

### Horizontal Positioning

| Old Class (Directional) | New Class (Logical) | LTR Behavior | RTL Behavior |
|------------------------|---------------------|--------------|--------------|
| `left-0` | `start-0` | left: 0 | right: 0 |
| `right-0` | `end-0` | right: 0 | left: 0 |
| `left-4` | `start-4` | left: 1rem | right: 1rem |
| `right-4` | `end-4` | right: 1rem | left: 1rem |

### Usage Example
```tsx
// ✅ CORRECT - RTL-aware
<div className="absolute start-0 top-0">

// ❌ INCORRECT - Not RTL-aware
<div className="absolute left-0 top-0">
```

## Text Alignment

### Text Alignment Classes

| Class | LTR Behavior | RTL Behavior | Notes |
|-------|--------------|--------------|-------|
| `text-left` | text-align: left | text-align: left | ⚠️ Hardcoded, avoid if possible |
| `text-right` | text-align: right | text-align: right | ⚠️ Hardcoded, avoid if possible |
| `text-center` | text-align: center | text-align: center | ✅ Safe to use |
| (no class) | text-align: left | text-align: right | ✅ Natural alignment based on `dir` |

### Best Practice
```tsx
// ✅ BEST - Let text align naturally based on dir attribute
<p className="text-gray-700">
  {branch.address[locale]}
</p>

// ✅ GOOD - Use center for centered content
<h1 className="text-center text-4xl font-bold">
  {title}
</h1>

// ❌ AVOID - Hardcoded alignment
<p className="text-left text-gray-700">
  {branch.address[locale]}
</p>
```

## Border Classes

### Horizontal Borders

| Old Class (Directional) | New Class (Logical) | LTR Behavior | RTL Behavior |
|------------------------|---------------------|--------------|--------------|
| `border-l` | `border-s` | border-left | border-right |
| `border-r` | `border-e` | border-right | border-left |
| `border-l-2` | `border-s-2` | border-left-width: 2px | border-right-width: 2px |
| `border-r-2` | `border-e-2` | border-right-width: 2px | border-left-width: 2px |

## Rounded Corners

### Horizontal Corner Rounding

| Old Class (Directional) | New Class (Logical) | LTR Behavior | RTL Behavior |
|------------------------|---------------------|--------------|--------------|
| `rounded-l` | `rounded-s` | border-top-left-radius, border-bottom-left-radius | border-top-right-radius, border-bottom-right-radius |
| `rounded-r` | `rounded-e` | border-top-right-radius, border-bottom-right-radius | border-top-left-radius, border-bottom-left-radius |
| `rounded-tl` | `rounded-ts` | border-top-left-radius | border-top-right-radius |
| `rounded-tr` | `rounded-te` | border-top-right-radius | border-top-left-radius |

## Flexbox

### Flex Direction
Flexbox automatically respects the `dir` attribute:

```tsx
// ✅ Automatically RTL-aware
<div className="flex items-center">
  <Phone className="w-4 h-4 me-2" />
  <span>123-456-7890</span>
</div>
```

In LTR: `[Icon] Text`
In RTL: `Text [Icon]` (when using `me-2` on icon)

## Grid Layout

Grid layouts also respect the `dir` attribute:

```tsx
// ✅ Automatically RTL-aware
<div className="grid grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

In LTR: `[Col 1] [Col 2]`
In RTL: `[Col 2] [Col 1]`

## Components Using RTL-Aware Classes

### BranchCard.tsx
```tsx
// Icon spacing
<Phone className="w-4 h-4 text-primary inline-block me-2 flex-shrink-0" />
<Clock className="w-4 h-4 text-primary inline-block me-2 flex-shrink-0" />
```

### BranchesList.tsx
```tsx
// Scrollbar padding
<div className="overflow-y-auto pe-2 custom-scrollbar">
```

### BranchesMap.tsx (Popups)
```tsx
// Icon spacing in popups
<Phone className="w-4 h-4 text-primary me-2 flex-shrink-0" />
<Clock className="w-4 h-4 text-primary me-2 flex-shrink-0" />
```

## Common Patterns

### Icon with Text
```tsx
// ✅ CORRECT Pattern
<div className="flex items-center">
  <Icon className="w-4 h-4 me-2 flex-shrink-0" />
  <span>{text}</span>
</div>
```

### Scrollable Container
```tsx
// ✅ CORRECT Pattern
<div className="overflow-y-auto pe-2 custom-scrollbar">
  {/* Content */}
</div>
```

### Button with Icon
```tsx
// ✅ CORRECT Pattern
<button className="flex items-center">
  <Icon className="w-5 h-5 me-2" />
  <span>{label}</span>
</button>
```

## Testing Checklist

When adding new components, verify:

- [ ] No `mr-*`, `ml-*`, `pr-*`, `pl-*` classes used
- [ ] Use `me-*`, `ms-*`, `pe-*`, `ps-*` instead
- [ ] No `left-*`, `right-*` positioning classes
- [ ] Use `start-*`, `end-*` instead
- [ ] No hardcoded `text-left` or `text-right` (unless necessary)
- [ ] Icons use `me-*` or `ms-*` for spacing
- [ ] Flexbox layouts work in both directions
- [ ] Grid layouts work in both directions

## Resources

### Tailwind CSS RTL Support
- [Tailwind CSS RTL Documentation](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

### Browser Support
All modern browsers support logical properties:
- Chrome 89+
- Firefox 66+
- Safari 15+
- Edge 89+

## Migration Guide

### Step 1: Find Directional Classes
```bash
# Search for directional classes in your codebase
grep -r "mr-\|ml-\|pr-\|pl-\|left-\|right-" app/components/
```

### Step 2: Replace with Logical Classes
| Find | Replace |
|------|---------|
| `mr-` | `me-` |
| `ml-` | `ms-` |
| `pr-` | `pe-` |
| `pl-` | `ps-` |
| `left-` | `start-` |
| `right-` | `end-` |

### Step 3: Test Both Locales
- Test in `/en/` route (LTR)
- Test in `/ar/` route (RTL)
- Verify layouts work correctly

### Step 4: Update Documentation
- Document any special cases
- Update component documentation
- Add to style guide

## Conclusion

Using RTL-aware Tailwind classes ensures that your application works correctly in both LTR and RTL layouts without additional CSS or JavaScript. Always prefer logical properties over directional properties for better internationalization support.
