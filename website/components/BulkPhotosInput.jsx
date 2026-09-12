import React, { useState } from 'react'
import { unset, set } from 'sanity'
import { Button, Card, Flex, Text, Stack, Box, Dialog } from '@sanity/ui'
import { TrashIcon } from '@sanity/icons'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: '23vvbmgr',
  dataset: 'production',
})

function getPhotoThumbnail(photo) {
  try {
    if (photo?.asset?._ref) {
      return builder.image(photo).width(200).height(200).fit('crop').url()
    }
    return ''
  } catch (e) {
    return ''
  }
}

export function BulkPhotosInput(props) {
  const { value, onChange, renderDefault } = props
  const photos = Array.isArray(value) ? value : []
  const count = photos.length

  const [confirmClearOpen, setConfirmClearOpen] = useState(false)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(new Set())
  const [featureMode, setFeatureMode] = useState(false)

  const hasFeaturedField = Boolean(
    props.schemaType?.of?.[0]?.fields?.some((f) => f.name === 'featured')
  )
  const featuredCount = photos.filter((p) => p.featured === true).length

  // Handler: Toggle featured status of a single photo
  const toggleFeaturePhoto = (key) => {
    const next = photos.map((p, idx) => {
      const k = p._key || String(idx)
      if (k === key) {
        return {
          ...p,
          featured: !p.featured,
        }
      }
      return p
    })
    onChange(set(next))
  }

  // Handler: Feature All Photos
  const handleFeatureAll = () => {
    const next = photos.map((p) => ({ ...p, featured: true }))
    onChange(set(next))
  }

  // Handler: Unfeature All Photos
  const handleUnfeatureAll = () => {
    const next = photos.map((p) => ({ ...p, featured: false }))
    onChange(set(next))
  }

  // Handler: Delete All Photos
  const handleClearAll = () => {
    onChange(unset())
    setConfirmClearOpen(false)
    setSelectMode(false)
    setFeatureMode(false)
    setSelectedKeys(new Set())
  }

  // Handler: Toggle single selection
  const toggleSelectPhoto = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  // Handler: Select All
  const handleSelectAll = () => {
    const allKeys = new Set(photos.map((p) => p._key))
    setSelectedKeys(allKeys)
  }

  // Handler: Deselect All
  const handleDeselectAll = () => {
    setSelectedKeys(new Set())
  }

  // Handler: Delete Selected Photos
  const handleDeleteSelected = () => {
    if (selectedKeys.size === 0) return
    const remaining = photos.filter((p) => !selectedKeys.has(p._key))
    onChange(remaining.length === 0 ? unset() : set(remaining))
    setSelectedKeys(new Set())
    if (remaining.length === 0) {
      setSelectMode(false)
    }
  }

  return (
    <Stack space={3}>
      {count > 0 && (
        <Card padding={3} radius={2} tone="transparent" border>
          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <Flex align="center" gap={2}>
              <Text weight="semibold" size={1}>
                {count} Photo{count === 1 ? '' : 's'} Uploaded
              </Text>
              {hasFeaturedField && featuredCount > 0 && !featureMode && (
                <Text size={1} muted>
                  • ({featuredCount} Featured ⭐)
                </Text>
              )}
            </Flex>

            <Flex align="center" gap={2} wrap="wrap">
              {!selectMode && !featureMode && (
                <>
                  {hasFeaturedField && (
                    <Button
                      mode={featuredCount > 0 ? 'default' : 'ghost'}
                      tone={featuredCount > 0 ? 'caution' : 'default'}
                      fontSize={1}
                      padding={2}
                      text={featuredCount > 0 ? `⭐ Featured (${featuredCount})` : '⭐ Feature Photos'}
                      onClick={() => {
                        setFeatureMode(true)
                        setSelectMode(false)
                      }}
                    />
                  )}
                  <Button
                    mode="ghost"
                    tone="default"
                    fontSize={1}
                    padding={2}
                    text="Select to Delete"
                    onClick={() => {
                      setSelectMode(true)
                      setFeatureMode(false)
                    }}
                  />
                  <Button
                    mode="ghost"
                    tone="critical"
                    icon={TrashIcon}
                    fontSize={1}
                    padding={2}
                    text={`Clear All (${count})`}
                    onClick={() => setConfirmClearOpen(true)}
                  />
                </>
              )}

              {featureMode && (
                <>
                  <Button
                    mode="bleed"
                    fontSize={1}
                    padding={2}
                    text={featuredCount === count ? 'Unfeature All' : 'Feature All'}
                    onClick={featuredCount === count ? handleUnfeatureAll : handleFeatureAll}
                  />
                  <Button
                    mode="default"
                    tone="primary"
                    fontSize={1}
                    padding={2}
                    text="Done"
                    onClick={() => setFeatureMode(false)}
                  />
                </>
              )}

              {selectMode && (
                <>
                  <Button
                    mode="bleed"
                    fontSize={1}
                    padding={2}
                    text={selectedKeys.size === count ? 'Deselect All' : 'Select All'}
                    onClick={selectedKeys.size === count ? handleDeselectAll : handleSelectAll}
                  />
                  <Button
                    mode="default"
                    tone="critical"
                    icon={TrashIcon}
                    fontSize={1}
                    padding={2}
                    text={`Delete Selected (${selectedKeys.size})`}
                    disabled={selectedKeys.size === 0}
                    onClick={handleDeleteSelected}
                  />
                  <Button
                    mode="bleed"
                    fontSize={1}
                    padding={2}
                    text="Done"
                    onClick={() => {
                      setSelectMode(false)
                      setSelectedKeys(new Set())
                    }}
                  />
                </>
              )}
            </Flex>
          </Flex>

          {/* Multi-Select Deletion Grid */}
          {selectMode && (
            <Box marginTop={3} paddingTop={3} style={{ borderTop: '1px solid var(--card-border-color)' }}>
              <Text size={1} muted style={{ marginBottom: '12px' }}>
                Click photos to select them for bulk deletion:
              </Text>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '10px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  padding: '4px',
                }}
              >
                {photos.map((photo, idx) => {
                  const key = photo._key || String(idx)
                  const isSelected = selectedKeys.has(key)
                  const thumb = getPhotoThumbnail(photo)

                  return (
                    <div
                      key={key}
                      onClick={() => toggleSelectPhoto(key)}
                      style={{
                        position: 'relative',
                        aspectRatio: '1 / 1',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '3px solid #f03e3e' : '1px solid #ccc',
                        boxShadow: isSelected ? '0 0 0 2px rgba(240, 62, 62, 0.4)' : 'none',
                        backgroundColor: '#1a1a1a',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isSelected ? 0.6 : 1,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                            fontSize: '12px',
                          }}
                        >
                          Photo #{idx + 1}
                        </div>
                      )}

                      {/* Selection Checkbox Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? '#f03e3e' : 'rgba(0,0,0,0.5)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Box>
          )}

          {/* Individual Featured Photo Selector Grid */}
          {featureMode && (
            <Box marginTop={3} paddingTop={3} style={{ borderTop: '1px solid var(--card-border-color)' }}>
              <Text size={1} muted style={{ marginBottom: '12px' }}>
                Click any photo to toggle whether it appears in the <strong>"Featured Work"</strong> showcase on the home page:
              </Text>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '10px',
                  maxHeight: '420px',
                  overflowY: 'auto',
                  padding: '4px',
                }}
              >
                {photos.map((photo, idx) => {
                  const key = photo._key || String(idx)
                  const isFeatured = photo.featured === true
                  const thumb = getPhotoThumbnail(photo)

                  return (
                    <div
                      key={key}
                      onClick={() => toggleFeaturePhoto(key)}
                      style={{
                        position: 'relative',
                        aspectRatio: '1 / 1',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isFeatured ? '3px solid #eab308' : '1px solid #444',
                        boxShadow: isFeatured ? '0 0 0 2px rgba(234, 179, 8, 0.4)' : 'none',
                        backgroundColor: '#1a1a1a',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                            fontSize: '12px',
                          }}
                        >
                          Photo #{idx + 1}
                        </div>
                      )}

                      {/* Star Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          padding: '2px 7px',
                          borderRadius: '12px',
                          backgroundColor: isFeatured ? '#eab308' : 'rgba(0,0,0,0.65)',
                          color: isFeatured ? '#000' : '#fff',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {isFeatured ? '⭐ Featured' : '☆ Not Featured'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Box>
          )}
        </Card>
      )}

      {/* Confirmation Dialog for Clear All */}
      {confirmClearOpen && (
        <Dialog
          id="confirm-clear-dialog"
          header="Clear All Photos?"
          onClose={() => setConfirmClearOpen(false)}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text size={2}>
                Are you sure you want to remove all <strong>{count} photos</strong> from this gallery?
              </Text>
              <Text size={1} muted>
                If you accidentally uploaded photos to the wrong client shoot, this will remove them so you can re-upload the correct photos.
              </Text>
              <Flex gap={3} justify="flex-end">
                <Button
                  mode="ghost"
                  text="Cancel"
                  onClick={() => setConfirmClearOpen(false)}
                />
                <Button
                  tone="critical"
                  icon={TrashIcon}
                  text={`Yes, Delete All ${count} Photos`}
                  onClick={handleClearAll}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}

      {/* Render the default Sanity array input (handles bulk drag & drop, uploads, preview, reordering) */}
      {!selectMode && !featureMode && renderDefault(props)}
    </Stack>
  )
}
