import TextToSpeechLayout from '@/features/text-to-speech/views/text-to-speech-layout'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>
}

export default Layout
