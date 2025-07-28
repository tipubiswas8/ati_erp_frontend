<template>
  <div :class="[themeClass, 'relative']">
    <!-- Floating Chat Button -->
    <button
      @click="toggleChat"
      :aria-label="isChatOpen ? 'Close chat' : 'Open chat'"
      :class="[
        'fixed bottom-8 gap-2 p-3 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300',
        buttonPositionClass,
      ]"
      style="box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3)"
    >
      <i
        class="fas fa-comment text-lg mr-1 transform transition-all duration-300 ease-in-out hover:rotate-12"
      ></i>
      <span class="hidden sm:block text-base font-semibold">{{$t('Chat')}}</span>
    </button>

    <!-- Chat Window Container -->
    <div
      v-if="isChatOpen"
      :class="[
        themeClass,
        'fixed bottom-8 w-full sm:w-[35%] md:w-[25%] h-[60%] sm:h-[70%] shadow-4xl flex z-50',
        chatWindowPositionClass,
      ]"
    >
      <!-- Individual Chat View (User List) -->
      <div
        v-if="indivisualchat"
        :class="[
          sidebarClass,
          'w-[25%] sm:w-[15%] flex flex-col items-center space-y-4 shadow-2xl bg-gradient-to-b from-gray-100 to-gray-200 p-2',
        ]"
      >
        <!-- Back Button -->
        <button
          @click="backToUserList"
          class="text-blue-500 mb-2 mt-2 flex items-center space-x-2 hover:text-blue-600 transition duration-200"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- User Avatars List -->
        <div
          v-for="user in users"
          :key="user.id"
          @click="selectUser(user)"
          class="w-12 h-12 cursor-pointer hover:bg-gray-600 rounded-full flex justify-center items-center transition-all duration-200"
        >
          <img
            :src="user.avatar"
            alt="user avatar"
            class="w-full h-full rounded-full"
          />
        </div>
      </div>

      <!-- Chat Window with Selected User -->
      <div
        v-if="selectedUser"
        :class="[
          themeClass,
          'w-full sm:w-[75%] md:w-[85%] flex flex-col bg-white shadow-lg overflow-hidden',
        ]"
      >
        <!-- Header Section: Avatar & Name -->
        <div
          :class="[
            headingClass,
            'border-b p-2 flex items-center justify-between relative bg-gray-50',
          ]"
        >
          <div class="flex items-center">
            <img
              :src="selectedUser.avatar"
              alt="user avatar"
              class="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <span class="text-lg font-semibold text-gray-800">{{
              selectedUser.name
            }}</span>
          </div>

          <!-- Close Chat Button -->
          <button
            @click="toggleChat"
            :aria-label="isChatOpen ? 'Close chat' : 'Open chat'"
            class="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- Chat Messages -->
        <div
          :class="[
            messageClass,
            'flex-1 overflow-y-auto max-h-[80%] p-2 scrollbar-hidden bg-gray-50',
          ]"
        >
          <div
            v-for="(message, index) in selectedUser.messages"
            :key="index"
            class="mb-2 flex items-start w-full"
          >
            <!-- Display Avatar for Other Person (left side) -->
            <img
              v-if="!message.isUser"
              :src="selectedUser.avatar"
              alt="user avatar"
              class="w-8 h-8 rounded-full mr-2 shadow-md object-cover"
            />

            <!-- Message Bubble -->
            <div
              :class="{
                'flex-row-reverse': message.isUser,
                'flex-row': !message.isUser,
              }"
              class="flex items-end w-full"
            >
              <!-- Display Avatar for User -->
              <img
                v-if="message.isUser"
                :src="userAvatar"
                alt="user avatar"
                class="w-8 h-8 rounded-full mr-2 shadow-md object-cover"
              />

              <!-- Message Text -->
              <div
                :class="{
                  'bg-blue-500 text-white': message.isUser,
                  'bg-gray-200 text-gray-700': !message.isUser,
                }"
                class="p-2 m-1 rounded-lg max-w-[70%] shadow-md break-words"
              >
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input Area -->
        <div
          :class="[
            sendSectionClass,
            'flex items-center space-x-2 p-2 border-t border-gray-200 bg-gray-100',
          ]"
        >
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            :class="[
              sendSectionClass,
              'flex-1 p-2 max-h-[90%] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm',
            ]"
          />
          <button
            @click="sendMessage"
            :class="[
              buttonClass,
              'bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300',
            ]"
          >
            <i class="fas fa-paper-plane text-base"></i>
          </button>
        </div>
      </div>

      <!-- User List (Full View with Name, Avatar, and Last Message) -->
      <div
        v-if="!indivisualchat"
        :class="[listClass, themeClass, 'w-full p-2 space-y-4 overflow-y-auto']"
      >
        <!-- Close Chat Button -->
        <button
          @click="toggleChat"
          :aria-label="isChatOpen ? 'Close chat' : 'Open chat'"
          class="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
        <div
          v-for="user in users"
          :key="user.id"
          @click="openChat(user)"
          :class="[
            'flex items-center space-x-3 p-1 cursor-pointer hover:bg-gray-200 rounded-md transition-all duration-200',
            listClass,
          ]"
        >
          <img
            :src="user.avatar"
            alt="user avatar"
            class="w-10 h-10 rounded-full shadow-md"
          />
          <div class="flex flex-col">
            <span class="font-semibold text-sm">{{ user.name }}</span>
            <span class="text-xs text-gray-600">{{ user.lastMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indivisualchat: false,
      headingClass: "",
      selectedUser: null,
      newMessage: "",
      userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      isChatOpen: false,
      theme: "light", // Default theme (light)
      users: [
        {
          id: 1,
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          lastMessage: "Hey, how are you?",
          messages: [
            { text: "Hello!", isUser: false },
            { text: "I am fine, thank you!", isUser: true },
          ],
        },
        {
          id: 2,
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          lastMessage: "Let’s meet up soon!",
          messages: [
            { text: "Hi!", isUser: false },
            { text: "Sure, sounds great!", isUser: true },
          ],
        },
        {
          id: 3,
          name: "Alice Johnson",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          lastMessage: "What’s up?",
          messages: [
            { text: "Hey!", isUser: false },
            { text: "Not much, you?", isUser: true },
          ],
        },
      ],
    };
  },
  computed: {
    buttonPositionClass() {
      return this.$store.state.sidebarPosition === "right"
        ? "left-8"
        : "right-8";
    },
    chatWindowPositionClass() {
      return this.$store.state.sidebarPosition === "right"
        ? "left-8"
        : "right-8";
    },
    themeClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-600 text-gray-800"
        : "bg-gray-200 text-gray-800";
    },
    buttonClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-blue-500 hover:bg-blue-600";
    },
    chatWindowClass() {
      return this.$store.state.theme === "dark" ? "bg-gray-800" : "bg-white";
    },
    messageClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-600 text-gray-200"
        : "bg-white text-gray-800";
    },
    sidebarClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-700 text-gray-200"
        : "bg-white text-gray-800";
    },
    listClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-800 text-gray-200"
        : "bg-gray-100 text-gray-800";
    },
    sendSectionClass() {
      return this.$store.state.theme === "dark"
        ? "bg-gray-700 text-gray-200 border-gray-600"
        : "bg-gray-100 text-gray-800 border-gray-300";
    },
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      this.selectedUser = null;
    },
    openChat(user) {
      this.selectedUser = user;
      this.indivisualchat = true;
    },
    selectUser(user) {
      this.selectedUser = user;
    },
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      this.selectedUser.messages.push({ text: this.newMessage, isUser: true });

      this.$nextTick(() => {
        const chatBox = document.querySelector(".flex-1");
        chatBox.scrollTop = chatBox.scrollHeight;
      });

      this.newMessage = "";
    },
    backToUserList() {
      this.indivisualchat = false;
      this.selectedUser = null;
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .w-full {
    width: 80%;
  }
  .sm\:w-[35%] {
    width: 90% !important;
  }
  .md\:w-[25%] {
    width: 70% !important;
  }
  .h-[60%] {
    height: 55% !important;
  }
  .sm\:hidden {
    display: none;
  }
  .text-lg {
    font-size: 1rem;
  }
  .text-base {
    font-size: 0.875rem;
  }
  .w-10 {
    width: 35px;
  }
  .h-10 {
    height: 35px;
  }
  .w-8 {
    width: 30px;
  }
  .h-8 {
    height: 30px;
  }
  .sm\:block {
    display: none;
  }
  .sm\:hidden {
    display: block;
  }
}
</style>
