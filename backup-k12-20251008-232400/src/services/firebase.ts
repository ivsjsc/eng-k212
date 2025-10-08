// This file bridges old imports (src/services/firebase) to the unified
// Firebase client located at ../../services/firebase. Keeping this thin
// wrapper avoids duplication while preserving backwards compatibility.
export * from '../../services/firebase';