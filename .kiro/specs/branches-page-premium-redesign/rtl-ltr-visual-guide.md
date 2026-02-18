# RTL/LTR Visual Testing Guide

## Quick Visual Comparison

### Icon Positioning

#### English (LTR) - Expected Layout:
```
[Phone Icon] → 123-456-7890
[Clock Icon] → 9:00 AM - 10:00 PM
```

#### Arabic (RTL) - Expected Layout:
```
123-456-7890 ← [Phone Icon]
9:00 AM - 10:00 PM ← [Clock Icon]
```

### Branch Card Layout

#### English (LTR):
```
┌─────────────────────────────────┐
│ Branch Name                     │
│ 123 Main Street                 │
│ Kuwait City                     │
│ [📞] 123-456-7890              │
│ [🕐] 9:00 AM - 10:00 PM        │
└─────────────────────────────────┘
```

#### Arabic (RTL):
```
┌─────────────────────────────────┐
│                     اسم الفرع   │
│                 شارع الرئيسي 123│
│                    مدينة الكويت │
│              123-456-7890 [📞]  │
│        9:00 AM - 10:00 PM [🕐]  │
└─────────────────────────────────┘
```

### Scrollbar Position

#### English (LTR):
```
┌──────────────────┬─┐
│ Branch List      │█│ ← Scrollbar on RIGHT
│ Content          │ │
│                  │ │
└──────────────────┴─┘
```

#### Arabic (RTL):
```
┌─┬──────────────────┐
│█│      قائمة الفروع│ ← Scrollbar on LEFT
│ │          المحتوى │
│ │                  │
└─┴──────────────────┘
```

## Testing URLs

### Arabic (RTL)
- Local: `http://localhost:3000/ar/branches`
- Production: `https://your-domain.com/ar/branches`

### English (LTR)
- Local: `http://localhost:3000/en/branches`
- Production: `https://your-domain.com/en/branches`

## Key Elements to Verify

### 1. Branch Cards
- [ ] Icons appear on correct side (left for LTR, right for RTL)
- [ ] Text flows in correct direction
- [ ] Spacing between icons and text is consistent
- [ ] Hover effects work correctly
- [ ] Selected state displays properly

### 2. Map Popups
- [ ] Icons appear on correct side
- [ ] Text flows in correct direction
- [ ] Popup content is readable
- [ ] Close button is on correct side

### 3. Filter Tabs
- [ ] Tabs are centered
- [ ] Active tab styling is correct
- [ ] Hover effects work
- [ ] Tab order makes sense

### 4. Page Header
- [ ] Title is centered
- [ ] Subtitle is centered
- [ ] Text is readable

### 5. Scrollbar
- [ ] Appears on right side in LTR
- [ ] Appears on left side in RTL
- [ ] Scrolling works smoothly
- [ ] Scrollbar styling is consistent

## Browser Testing Matrix

| Browser | LTR | RTL | Notes |
|---------|-----|-----|-------|
| Chrome  | ⬜  | ⬜  |       |
| Firefox | ⬜  | ⬜  |       |
| Safari  | ⬜  | ⬜  |       |
| Edge    | ⬜  | ⬜  |       |

## Device Testing Matrix

| Device Type | Screen Size | LTR | RTL | Notes |
|-------------|-------------|-----|-----|-------|
| Mobile      | < 768px     | ⬜  | ⬜  |       |
| Tablet      | 768-1024px  | ⬜  | ⬜  |       |
| Desktop     | > 1024px    | ⬜  | ⬜  |       |

## Common Issues to Watch For

### ❌ Incorrect Implementation
1. Icons on wrong side in RTL
2. Scrollbar on wrong side in RTL
3. Text alignment issues
4. Overlapping content
5. Broken layouts on mobile

### ✅ Correct Implementation
1. Icons automatically flip sides based on locale
2. Scrollbar position changes with text direction
3. Text naturally aligns based on `dir` attribute
4. No overlapping or layout breaks
5. Responsive design works in both directions

## Screenshot Checklist

Take screenshots of the following for documentation:

### English (LTR)
- [ ] Full page view (desktop)
- [ ] Branch card with icons
- [ ] Map popup with branch details
- [ ] Filter tabs
- [ ] Mobile view

### Arabic (RTL)
- [ ] Full page view (desktop)
- [ ] Branch card with icons
- [ ] Map popup with branch details
- [ ] Filter tabs
- [ ] Mobile view

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through elements in correct order (LTR: left-to-right, RTL: right-to-left)
- [ ] Focus indicators are visible
- [ ] Enter/Space keys work on interactive elements

### Screen Reader Testing
- [ ] Content is announced in correct order
- [ ] ARIA labels are present and correct
- [ ] Language is properly detected

## Performance Testing

- [ ] Page loads quickly in both locales
- [ ] No layout shifts when switching locales
- [ ] Smooth animations in both directions
- [ ] Map renders efficiently

## Sign-off

### Developer
- [ ] Code review completed
- [ ] All RTL-aware classes verified
- [ ] No hardcoded directional classes found

### QA
- [ ] Manual testing completed
- [ ] All browsers tested
- [ ] All devices tested
- [ ] Screenshots captured

### Product Owner
- [ ] Visual design approved
- [ ] User experience validated
- [ ] Ready for production

---

**Last Updated:** [Date]
**Tested By:** [Name]
**Status:** ✅ VERIFIED
