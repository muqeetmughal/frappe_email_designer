import React from 'react'

const GenerateTemplate = () => {
  return (
    <div>
        <form
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 500 }}
            onSubmit={e => {
                e.preventDefault();
                // handle submit logic here
            }}
        >
            <label htmlFor="prompt">Enter your prompt:</label>
            <textarea
                id="prompt"
                name="prompt"
                rows={4}
                style={{ resize: 'vertical', padding: '0.5rem' }}
                placeholder="Describe the email template you want to generate..."
                required
            />
            <button type="submit" style={{ alignSelf: 'flex-start' }}>
                Generate Template
            </button>
        </form>
    </div>
  )
}

export default GenerateTemplate