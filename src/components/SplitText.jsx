import { Fragment } from 'react';

// Splits text into masked words for the slide-up reveal. Screen readers get the
// plain sentence; the animated copy is hidden from them.
export default function SplitText({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="split-word">
              <span data-split>{word}</span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
