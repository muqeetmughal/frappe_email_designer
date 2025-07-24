import openai

def generate_email_template(prompt):
    api_key='', model="gpt-3.5-turbo", max_tokens=512
    """
    Generates an email template using OpenAI's API.

    Args:
        prompt (str): The prompt describing the email template requirements.
        api_key (str): Your OpenAI API key.
        model (str): The OpenAI model to use.
        max_tokens (int): Maximum number of tokens in the response.

    Returns:
        str: Generated email template.
    """
    openai.api_key = api_key

    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are an expert email template generator."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=max_tokens,
        temperature=0.7
    )

    return response.choices[0].message['content'].strip()