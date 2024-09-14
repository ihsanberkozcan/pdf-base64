import { CopyButton, Textarea, useMantineTheme } from "@mantine/core";
import { useRef, useState } from "react";
import { Text, Group, Button, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from "./MyDropzone.module.css"

const MyDropzone = () => {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const theme = useMantineTheme();
  const openRef = useRef(null);

  const handleDrop = (files) => {
    if (files.length > 0) {
      const file = files[0];
  
      setFileName(file.name);
  
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setBase64(base64String); 
      };
  
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>PDF to Base64 Converter</h1>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        multiple={false}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload Pdf File</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">

          </Text>
        </div>
      </Dropzone>


      {fileName && (
        <div>
          <h2>{fileName}</h2>


          <Textarea
            mt="md"
            mb="md"
            value={base64}
            resize="vertical"
          />

          <CopyButton value={base64}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy} fullWidth size="lg">
                {copied ? 'Copied Base64' : 'Copy Base64'}
              </Button>
            )}
          </CopyButton>

        </div>
      )}
    </div>
  );
};

export default MyDropzone;

