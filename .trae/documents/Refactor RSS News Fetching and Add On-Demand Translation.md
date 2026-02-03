# RSS News Fetching & Translation Refactoring Plan

## 1. Backend Service Refactoring (`src/services/newsService.ts`)

### `fetchLatestNews` Modification
- **Goal**: Fetch and display *all* relevant RSS items (up to 20) without truncation or auto-translation of the full content.
- **Steps**:
  1.  **Fetch**: Retrieve items from configured RSS feeds.
  2.  **Selection**: Increase limit from 10 to 20 items.
  3.  **Metadata Generation (LLM)**: 
      - Send only `Title` and `Description` (snippet) to Aliyun Qwen-Plus.
      - Prompt LLM to generate **Chinese Summary**, **Tags**, and **Difficulty Level** for *each* item.
      - **Crucial**: Explicitly instruct LLM *not* to translate or rewrite the main body content in this step.
  4.  **Merge**: Combine the LLM-generated metadata (Summary, Tags, Difficulty) with the **Original Raw RSS Content** (preserving full text).
  5.  **Storage**: Save the combined object to Supabase.

### New `translateText` Method
- **Goal**: Provide on-demand translation capability.
- **Input**: Raw text string.
- **Logic**: Call Aliyun Qwen-Plus with a prompt to translate the input text to Chinese, maintaining original formatting (Markdown/HTML).
- **Output**: Translated text string.

## 2. Frontend UI Updates (`src/components/Admin/NewsManager.tsx`)

### News List & Modal
- **List View**: Ensure all fetched items are rendered (remove any hardcoded display limits if present).
- **Detail Modal**:
  - **Content Area**: Display the full `content` (which is now the original English text).
  - **Translation Controls**:
    - Add a **"Translate to Chinese"** button above the content.
    - **Loading State**: Show a spinner/loading text during API call.
    - **Success State**: Replace the English content with the returned Chinese translation.
    - **Error State**: Show an error message (e.g., "Translation failed") with a **"Retry"** button.

## 3. Verification
- **Fetch Test**: Run "Fetch Latest News" and verify that >3 items appear and the content is in English (original).
- **View Test**: Open a news item and verify the content is complete.
- **Translate Test**: Click "Translate", observe loading, verify text changes to Chinese.
- **Error Test**: Simulate a network/API error to verify the Retry button appears.
