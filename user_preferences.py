def run_welcome_conversation(messages=None):
    if messages is None:
        # Interactive mode
        welcome_chat_history.append({"role": "user", "content": "Hi! I'm moving in this week."})
        while True:
            result = Runner.run_sync(welcome_agent, welcome_chat_history)
            assistant_reply = result.final_output.strip()
            print(f"\n{welcome_agent.name}: {assistant_reply}")

            if "summary" in assistant_reply.lower() or "all set" in assistant_reply.lower() or "welcome again" in assistant_reply.lower():
                return assistant_reply  # Return the final summary

            user_input = input("\nYou: ").strip()
            welcome_chat_history.append({"role": "assistant", "content": assistant_reply})
            welcome_chat_history.append({"role": "user", "content": user_input})
    else:
        # Server mode
        if not welcome_chat_history:  # If this is the first message
            welcome_chat_history.append({"role": "assistant", "content": "Welcome! I'm your friendly onboarding assistant. I'll help you get settled into your new shared home. Let's start by discussing your preferences for living together. What would you like to know about first?"})
        
        welcome_chat_history.extend(messages)
        result = Runner.run_sync(welcome_agent, welcome_chat_history)
        return result.final_output.strip() 